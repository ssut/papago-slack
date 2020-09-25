import { Papago } from './papago';
import 'dotenv/config';
import 'source-map-support/register';

import { Config } from './config';
import { RTMClient } from '@slack/rtm-api';
import { WebClient } from '@slack/web-api';

const SPECIFY_TARGET_LANGUAGE_PATTERN = /^!(?<language>영어|en|한국어|ko|일본어|ja|jp)\s/;

async function bootstrap() {
  const papago = new Papago(Config.naver.clientId, Config.naver.clientSecret);
  const rtm = new RTMClient(Config.slack.token);
  const slack = new WebClient(Config.slack.token);

  rtm.on('ready', () => {
    console.info('RTM is ready');
  });

  const botUserTag = `<@${Config.slack.botUserId}>`;
  rtm.on('message', async (event) => {
    if (event.type === 'message' && typeof event.text === 'string') {
      if (event.text.includes(botUserTag)) {
        let text: string = event.text.replace(botUserTag, '').trim();

        // detect language
        const sourceLang = await papago.detect(text);
        let source: string | null = 'ko';
        let target: string | null = null;

        // specify target language
        const match = SPECIFY_TARGET_LANGUAGE_PATTERN.exec(text);
        if (match !== null && typeof match?.[0] === 'string') {
          const [matchedText] = match;
          text = text.substring(matchedText.length);

          const { language } = match.groups;

          switch (language) {
            case '영어':
            case 'en':
              target = 'en';
              break;

            case '한국어':
            case 'ko':
              target = 'ko';
              break;

            case '일본어':
            case 'ja':
            case 'jp':
              target = 'ja';
              break;

            default:
          }
        }

        switch (sourceLang) {
          case 'unk':
            source = 'en';
            break;

          case 'ja':
            source = 'ja';
            target = target ?? 'ko';
            break;

          case 'ko':
            source = 'ko';
            target = target ?? 'ja';
            break;

          case 'en':
            source = 'en';
            target = target ?? 'ko';
            break;

          default:
        }
        if (source === null || target === null || source === target) {
          return;
        }
        console.info('source', source, 'target', target);

        const translated = await papago.translate(source, target, text);
        if (translated === null) {
          return;
        }

        await slack.chat
          .postMessage({
            channel: event.channel,
            text: translated,
            attachments: [
              {
                mrkdwn_in: ['text'],
                title: '',
                text,
              },
            ],
          })
          .catch(console.error);
      }
    }
  });
  rtm.start().catch(console.error);
}

bootstrap();
