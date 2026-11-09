import type { LessonSection } from '@/types/lesson';
import { choice, grammar, listen, matching, ordering, translate, w } from '@/content/lessons/builders';

export const a1Section6: LessonSection = {
  id: 'A1-6',
  level: 'A1',
  index: 6,
  title: 'برنامه روزانه',
  lessons: [
    {
      id: 'A1-6-1',
      title: 'کارهای صبح',
      words: [
        w('wake up', 'بیدار شدن', '/weɪk ʌp/'),
        w('get up', 'بلند شدن', '/ɡɛt ʌp/'),
        w('eat', 'خوردن', '/iːt/'),
        w('sleep', 'خوابیدن', '/sliːp/'),
        w('wash', 'شستن', '/wɒʃ/'),
      ],
      grammar: grammar('فعل ساده', 'با I، you، we و they شکل ساده فعل را بدون تغییر به کار ببرید.', [
        ['I eat breakfast.', 'من صبحانه می‌خورم.'],
        ['We sleep at night.', 'ما شب‌ها می‌خوابیم.'],
      ]),
      exercises: [
        choice('معنی "sleep" چیست؟', ['خوردن', 'خوابیدن', 'شستن', 'بیدار شدن'], 1),
        listen(['شستن', 'خوردن', 'خوابیدن'], 0, 'wash'),
        translate('من از خواب بیدار می‌شوم.', ['I wake up.', 'I sleep up.', 'I eat up.', 'I wash up.'], 0),
        matching([
          ['wake up', 'بیدار شدن'],
          ['eat', 'خوردن'],
          ['sleep', 'خوابیدن'],
          ['wash', 'شستن'],
        ]),
        ordering('I wake up', 'من بیدار می‌شوم'),
      ],
    },
    {
      id: 'A1-6-2',
      title: 'رفتن و آمدن',
      words: [
        w('go', 'رفتن', '/ɡoʊ/'),
        w('come', 'آمدن', '/kʌm/'),
        w('work', 'کار کردن', '/wɜːrk/'),
        w('study', 'درس خواندن', '/ˈstʌdi/'),
        w('home', 'خانه', '/hoʊm/'),
      ],
      grammar: grammar('to بعد از فعل حرکت', 'بعد از go و come برای مقصد از to یا home استفاده کنید.', [
        ['I go to work.', 'من به سر کار می‌روم.'],
        ['We come home.', 'ما به خانه می‌آییم.'],
      ]),
      exercises: [
        choice('معنی "study" چیست؟', ['کار کردن', 'درس خواندن', 'رفتن', 'آمدن'], 1),
        listen(['کار کردن', 'رفتن', 'آمدن'], 0, 'work'),
        translate('ما به خانه می‌آییم.', ['We come home.', 'We go home.', 'They work home.', 'I study home.'], 0),
        matching([
          ['go', 'رفتن'],
          ['come', 'آمدن'],
          ['work', 'کار کردن'],
          ['home', 'خانه'],
        ]),
        ordering('I go to work', 'من به سر کار می‌روم'),
      ],
    },
    {
      id: 'A1-6-3',
      title: 'خواندن و نوشتن',
      words: [
        w('read', 'خواندن', '/riːd/'),
        w('write', 'نوشتن', '/raɪt/'),
        w('listen', 'گوش دادن', '/ˈlɪsən/'),
        w('speak', 'صحبت کردن', '/spiːk/'),
        w('watch', 'تماشا کردن', '/wɒtʃ/'),
      ],
      grammar: grammar('منفی با don\'t', 'برای منفی کردن فعل با I و you از don\'t قبل از فعل استفاده کنید.', [
        ['I don\'t read.', 'من نمی‌خوانم.'],
        ['They don\'t speak English.', 'آن‌ها انگلیسی صحبت نمی‌کنند.'],
      ]),
      exercises: [
        choice('معنی "write" چیست؟', ['خواندن', 'نوشتن', 'گوش دادن', 'صحبت کردن'], 1),
        listen(['صحبت کردن', 'نوشتن', 'تماشا کردن'], 0, 'speak'),
        translate('من گوش می‌دهم.', ['I listen.', 'I read.', 'I write.', 'I speak.'], 0),
        matching([
          ['read', 'خواندن'],
          ['write', 'نوشتن'],
          ['listen', 'گوش دادن'],
          ['watch', 'تماشا کردن'],
        ]),
        ordering('I don\'t read', 'من نمی‌خوانم'),
      ],
    },
    {
      id: 'A1-6-4',
      title: 'دفعات انجام کار',
      words: [
        w('every day', 'هر روز', '/ˈɛvri deɪ/'),
        w('always', 'همیشه', '/ˈɔːlweɪz/'),
        w('often', 'اغلب', '/ˈɒfən/'),
        w('sometimes', 'گاهی', '/ˈsʌmtaɪmz/'),
        w('never', 'هرگز', '/ˈnɛvər/'),
      ],
      grammar: grammar('قید تکرار', 'قیدهای تکرار قبل از فعل اصلی قرار می‌گیرند.', [
        ['I always read.', 'من همیشه می‌خوانم.'],
        ['She never sleeps late.', 'او هرگز دیر نمی‌خوابد.'],
      ]),
      exercises: [
        choice('معنی "never" چیست؟', ['همیشه', 'گاهی', 'هرگز', 'اغلب'], 2),
        listen(['گاهی', 'اغلب', 'هرگز'], 0, 'sometimes'),
        translate('من همیشه کار می‌کنم.', ['I always work.', 'I never work.', 'I always sleep.', 'I sometimes go.'], 0),
        matching([
          ['every day', 'هر روز'],
          ['always', 'همیشه'],
          ['often', 'اغلب'],
          ['never', 'هرگز'],
        ]),
        ordering('I always work', 'من همیشه کار می‌کنم'),
      ],
    },
    {
      id: 'A1-6-5',
      title: 'بخش‌های روز',
      words: [
        w('afternoon', 'بعدازظهر', '/ˌæftərˈnuːn/'),
        w('evening', 'عصر', '/ˈiːvnɪŋ/'),
        w('day', 'روز', '/deɪ/'),
        w('week', 'هفته', '/wiːk/'),
        w('time', 'زمان', '/taɪm/'),
      ],
      grammar: grammar('in + بخش روز', 'برای گفتن بخشی از روز از in the به همراه آن بخش استفاده کنید.', [
        ['I study in the evening.', 'من عصرها درس می‌خوانم.'],
        ['We work in the afternoon.', 'ما بعدازظهرها کار می‌کنیم.'],
      ]),
      exercises: [
        choice('معنی "evening" چیست؟', ['صبح', 'عصر', 'شب', 'بعدازظهر'], 1),
        listen(['هفته', 'روز', 'زمان'], 0, 'week'),
        translate('من عصر کار می‌کنم.', ['I work in the evening.', 'I eat in the morning.', 'I sleep in the day.', 'I read in the week.'], 0),
        matching([
          ['afternoon', 'بعدازظهر'],
          ['evening', 'عصر'],
          ['day', 'روز'],
          ['time', 'زمان'],
        ]),
        ordering('I work in the evening', 'من عصرها کار می‌کنم'),
      ],
    },
  ],
};
