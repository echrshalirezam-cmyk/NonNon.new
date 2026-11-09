import type { LessonSection } from '@/types/lesson';
import { choice, grammar, listen, matching, ordering, translate, w } from '@/content/lessons/builders';

export const a1Section9: LessonSection = {
  id: 'A1-9',
  level: 'A1',
  index: 9,
  title: 'روزها، هوا و زمان',
  lessons: [
    {
      id: 'A1-9-1',
      title: 'روزهای هفته',
      words: [
        w('Monday', 'دوشنبه', '/ˈmʌndeɪ/'),
        w('Friday', 'جمعه', '/ˈfraɪdeɪ/'),
        w('Saturday', 'شنبه', '/ˈsætərdeɪ/'),
        w('Sunday', 'یکشنبه', '/ˈsʌndeɪ/'),
        w('today', 'امروز', '/təˈdeɪ/'),
      ],
      grammar: grammar('on + روز', 'برای گفتن روز از on قبل از نام روز استفاده کنید.', [
        ['I work on Monday.', 'من دوشنبه‌ها کار می‌کنم.'],
        ['Today is Sunday.', 'امروز یکشنبه است.'],
      ]),
      exercises: [
        choice('معنی "Friday" چیست؟', ['شنبه', 'جمعه', 'یکشنبه', 'دوشنبه'], 1),
        listen(['امروز', 'فردا', 'دیروز'], 0, 'today'),
        translate('امروز یکشنبه است.', ['Today is Sunday.', 'Today is Monday.', 'Sunday is today.', 'Tomorrow is Friday.'], 0),
        matching([
          ['Monday', 'دوشنبه'],
          ['Friday', 'جمعه'],
          ['Saturday', 'شنبه'],
          ['today', 'امروز'],
        ]),
        ordering('Today is Sunday', 'امروز یکشنبه است'),
      ],
    },
    {
      id: 'A1-9-2',
      title: 'گذشته، حال و آینده',
      words: [
        w('tomorrow', 'فردا', '/təˈmɒroʊ/'),
        w('yesterday', 'دیروز', '/ˈjɛstərdeɪ/'),
        w('now', 'الان', '/naʊ/'),
        w('later', 'بعداً', '/ˈleɪtər/'),
        w('soon', 'به زودی', '/suːn/'),
      ],
      grammar: grammar('کلمات زمان', 'کلمات زمان می‌توانند در ابتدا یا انتهای جمله بیایند.', [
        ['Tomorrow I study.', 'فردا درس می‌خوانم.'],
        ['I read now.', 'الان می‌خوانم.'],
      ]),
      exercises: [
        choice('معنی "yesterday" چیست؟', ['فردا', 'امروز', 'دیروز', 'الان'], 2),
        listen(['بعداً', 'الان', 'دیروز'], 0, 'later'),
        translate('فردا کار می‌کنم.', ['I work tomorrow.', 'I worked yesterday.', 'I sleep now.', 'I study soon.'], 0),
        matching([
          ['tomorrow', 'فردا'],
          ['yesterday', 'دیروز'],
          ['now', 'الان'],
          ['soon', 'به زودی'],
        ]),
        ordering('I work tomorrow', 'فردا کار می‌کنم'),
      ],
    },
    {
      id: 'A1-9-3',
      title: 'هوای گرم و سرد',
      words: [
        w('hot', 'داغ', '/hɒt/'),
        w('cold', 'سرد', '/koʊld/'),
        w('warm', 'گرم', '/wɔːrm/'),
        w('cool', 'خنک', '/kuːl/'),
        w('sunny', 'آفتابی', '/ˈsʌni/'),
      ],
      grammar: grammar('It is + صفت', 'برای توصیف هوا از It is به همراه صفت استفاده کنید.', [
        ['It is hot today.', 'امروز هوا گرم است.'],
        ['It is sunny and cold.', 'هوا آفتابی و سرد است.'],
      ]),
      exercises: [
        choice('معنی "cold" چیست؟', ['داغ', 'سرد', 'گرم', 'خنک'], 1),
        listen(['آفتابی', 'بارانی', 'ابری'], 0, 'sunny'),
        translate('هوا سرد است.', ['It is cold.', 'It is hot.', 'It is sunny.', 'It is warm.'], 0),
        matching([
          ['hot', 'داغ'],
          ['cold', 'سرد'],
          ['warm', 'گرم'],
          ['sunny', 'آفتابی'],
        ]),
        ordering('It is hot today', 'امروز هوا گرم است'),
      ],
    },
    {
      id: 'A1-9-4',
      title: 'ساعت',
      words: [
        w('minute', 'دقیقه', '/ˈmɪnɪt/'),
        w('hour', 'ساعت', '/aʊər/'),
        w('noon', 'ظهر', '/nuːn/'),
        w('midnight', 'نیمه شب', '/ˈmɪdnaɪt/'),
        w('early', 'زود', '/ˈɜːrli/'),
      ],
      grammar: grammar('What time is it?', 'برای پرسیدن ساعت از What time is it? استفاده کنید.', [
        ['What time is it?', 'ساعت چند است؟'],
        ['It is noon now.', 'الان ظهر است.'],
      ]),
      exercises: [
        choice('معنی "hour" چیست؟', ['دقیقه', 'ساعت', 'ظهر', 'زود'], 1),
        listen(['نیمه شب', 'ظهر', 'صبح'], 0, 'midnight'),
        translate('ساعت چند است؟', ['What time is it?', 'Where is it?', 'What is your name?', 'How is it?'], 0),
        matching([
          ['minute', 'دقیقه'],
          ['hour', 'ساعت'],
          ['noon', 'ظهر'],
          ['early', 'زود'],
        ]),
        ordering('What time is it', 'ساعت چند است؟'),
      ],
    },
    {
      id: 'A1-9-5',
      title: 'فصل‌های سال',
      words: [
        w('season', 'فصل', '/ˈsiːzən/'),
        w('spring', 'بهار', '/sprɪŋ/'),
        w('summer', 'تابستان', '/ˈsʌmər/'),
        w('autumn', 'پاییز', '/ˈɔːtəm/'),
        w('winter', 'زمستان', '/ˈwɪntər/'),
      ],
      grammar: grammar('In + فصل', 'برای گفتن فصل از in قبل از نام فصل استفاده کنید.', [
        ['In spring, it is warm.', 'در بهار هوا گرم است.'],
        ['In winter, it is cold.', 'در زمستان هوا سرد است.'],
      ]),
      exercises: [
        choice('معنی "summer" چیست؟', ['زمستان', 'تابستان', 'بهار', 'پاییز'], 1),
        listen(['پاییز', 'بهار', 'زمستان'], 0, 'autumn'),
        translate('در زمستان هوا سرد است.', ['In winter, it is cold.', 'In summer, it is cold.', 'In spring, it is hot.', 'In autumn, it is sunny.'], 0),
        matching([
          ['season', 'فصل'],
          ['spring', 'بهار'],
          ['summer', 'تابستان'],
          ['winter', 'زمستان'],
        ]),
        ordering('In winter it is cold', 'در زمستان هوا سرد است'),
      ],
    },
  ],
};
