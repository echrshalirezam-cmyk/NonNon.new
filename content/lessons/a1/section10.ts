import type { LessonSection } from '@/types/lesson';
import { choice, grammar, listen, matching, ordering, translate, w } from '@/content/lessons/builders';

export const a1Section10: LessonSection = {
  id: 'A1-10',
  level: 'A1',
  index: 10,
  title: 'پرسش و مرور',
  lessons: [
    {
      id: 'A1-10-1',
      title: 'کلمات پرسشی',
      words: [
        w('what', 'چه', '/wʌt/'),
        w('where', 'کجا', '/wɛr/'),
        w('who', 'چه کسی', '/huː/'),
        w('why', 'چرا', '/waɪ/'),
        w('when', 'کی', '/wɛn/'),
      ],
      grammar: grammar('کلمات پرسشی', 'کلمه پرسشی را در ابتدای جمله قرار دهید.', [
        ['What is this?', 'این چیست؟'],
        ['Where is my bag?', 'کیف من کجاست؟'],
      ]),
      exercises: [
        choice('معنی "where" چیست؟', ['کی', 'کجا', 'چه کسی', 'چرا'], 1),
        listen(['چرا', 'کی', 'چه'], 0, 'why'),
        translate('کیف من کجاست؟', ['Where is my bag?', 'What is my bag?', 'Who is my bag?', 'Why is my bag?'], 0),
        matching([
          ['what', 'چه'],
          ['where', 'کجا'],
          ['who', 'چه کسی'],
          ['when', 'کی'],
        ]),
        ordering('Where is my bag', 'کیف من کجاست؟'),
      ],
    },
    {
      id: 'A1-10-2',
      title: 'قیمت و انتخاب',
      words: [
        w('which', 'کدام', '/wɪtʃ/'),
        w('how much', 'چقدر', '/haʊ mʌtʃ/'),
        w('expensive', 'گران', '/ɪkˈspɛnsɪv/'),
        w('cheap', 'ارزان', '/tʃiːp/'),
        w('buy', 'خریدن', '/baɪ/'),
      ],
      grammar: grammar('How much is it?', 'برای پرسیدن قیمت از How much is it? استفاده کنید.', [
        ['How much is it?', 'قیمتش چقدر است؟'],
        ['This is cheap.', 'این ارزان است.'],
      ]),
      exercises: [
        choice('معنی "cheap" چیست؟', ['گران', 'ارزان', 'خوب', 'بزرگ'], 1),
        listen(['خریدن', 'فروختن', 'دیدن'], 0, 'buy'),
        translate('قیمتش چقدر است؟', ['How much is it?', 'How old is it?', 'Which is it?', 'Where is it?'], 0),
        matching([
          ['which', 'کدام'],
          ['how much', 'چقدر'],
          ['expensive', 'گران'],
          ['buy', 'خریدن'],
        ]),
        ordering('How much is it', 'قیمتش چقدر است؟'),
      ],
    },
    {
      id: 'A1-10-3',
      title: 'پرسیدن و یاد گرفتن',
      words: [
        w('ask', 'پرسیدن', '/æsk/'),
        w('answer', 'پاسخ', '/ˈɑːnsər/'),
        w('question', 'سؤال', '/ˈkwɛstʃən/'),
        w('learn', 'یاد گرفتن', '/lɜːrn/'),
        w('know', 'دانستن', '/noʊ/'),
      ],
      grammar: grammar('Can / Can\'t', 'برای توانایی از can و برای نداشتن توانایی از can\'t استفاده کنید.', [
        ['I can read.', 'من می‌توانم بخوانم.'],
        ['I can\'t swim.', 'من نمی‌توانم شنا کنم.'],
      ]),
      exercises: [
        choice('معنی "question" چیست؟', ['پاسخ', 'سؤال', 'یادگیری', 'دانستن'], 1),
        listen(['پاسخ', 'سؤال', 'پرسیدن'], 0, 'answer'),
        translate('من می‌توانم بخوانم.', ['I can read.', 'I can\'t read.', 'I read can.', 'I can write question.'], 0),
        matching([
          ['ask', 'پرسیدن'],
          ['answer', 'پاسخ'],
          ['learn', 'یاد گرفتن'],
          ['know', 'دانستن'],
        ]),
        ordering('I can read', 'من می‌توانم بخوانم'),
      ],
    },
    {
      id: 'A1-10-4',
      title: 'مرور توصیف‌ها',
      words: [
        w('big', 'بزرگ', '/bɪɡ/'),
        w('small', 'کوچک', '/smɔːl/'),
        w('new', 'نو', '/njuː/'),
        w('bad', 'بد', '/bæd/'),
        w('happy', 'خوشحال', '/ˈhæpi/'),
      ],
      grammar: grammar('صفت بعد از am / is', 'صفت بعد از am یا is حالت اسم را توصیف می‌کند.', [
        ['It is big.', 'بزرگ است.'],
        ['I am happy.', 'من خوشحالم.'],
      ]),
      exercises: [
        choice('معنی "happy" چیست؟', ['غمگین', 'خوشحال', 'بد', 'نو'], 1),
        listen(['کوچک', 'بزرگ', 'نو'], 0, 'small'),
        translate('من خوشحالم.', ['I am happy.', 'I am sad.', 'I am big.', 'I am new.'], 0),
        matching([
          ['big', 'بزرگ'],
          ['small', 'کوچک'],
          ['new', 'نو'],
          ['bad', 'بد'],
        ]),
        ordering('I am happy', 'من خوشحالم'),
      ],
    },
    {
      id: 'A1-10-5',
      title: 'مرور نهایی',
      words: [
        w('again', 'دوباره', '/əˈɡɛn/'),
        w('very', 'خیلی', '/ˈvɛri/'),
        w('also', 'همچنین', '/ˈɔːlsoʊ/'),
        w('and', 'و', '/ænd/'),
        w('but', 'اما', '/bʌt/'),
      ],
      grammar: grammar('and / but', 'برای وصل کردن دو جمله از and برای افزودن و but برای مخالفت استفاده کنید.', [
        ['I am happy and hungry.', 'من خوشحال و گرسنه‌ام.'],
        ['I like tea, but not coffee.', 'من چای دوست دارم، اما قهوه نه.'],
      ]),
      exercises: [
        choice('معنی "again" چیست؟', ['دوباره', 'همچنین', 'خیلی', 'اما'], 0),
        listen(['خیلی', 'اما', 'و'], 0, 'very'),
        translate('من خوشحال و گرسنه‌ام.', ['I am happy and hungry.', 'I am happy but sad.', 'I am tea and coffee.', 'I am also red.'], 0),
        matching([
          ['again', 'دوباره'],
          ['very', 'خیلی'],
          ['also', 'همچنین'],
          ['but', 'اما'],
        ]),
        ordering('I like tea but not coffee', 'من چای دوست دارم، اما قهوه نه'),
      ],
    },
  ],
};
