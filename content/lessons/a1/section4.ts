import type { LessonSection } from '@/types/lesson';
import { choice, grammar, listen, matching, ordering, translate, w } from '@/content/lessons/builders';

export const a1Section4: LessonSection = {
  id: 'A1-4',
  level: 'A1',
  index: 4,
  title: 'رنگ‌ها و وسایل',
  lessons: [
    {
      id: 'A1-4-1',
      title: 'رنگ‌های اصلی',
      words: [
        w('red', 'قرمز', '/rɛd/'),
        w('blue', 'آبی', '/bluː/'),
        w('green', 'سبز', '/ɡriːn/'),
        w('yellow', 'زرد', '/ˈjɛloʊ/'),
        w('white', 'سفید', '/waɪt/'),
      ],
      grammar: grammar('the', 'the به معنی «آن» یا «این» است و قبل از اسم می‌آید.', [
        ['The sky is blue.', 'آسمان آبی است.'],
        ['The apple is red.', 'سیب قرمز است.'],
      ]),
      exercises: [
        choice('معنی "green" چیست؟', ['آبی', 'سبز', 'زرد', 'سفید'], 1),
        listen(['قرمز', 'زرد', 'سفید'], 1, 'yellow'),
        translate('آسمان آبی است.', ['The sky is blue.', 'The grass is red.', 'The sun is white.', 'The book is green.'], 0),
        matching([
          ['red', 'قرمز'],
          ['blue', 'آبی'],
          ['green', 'سبز'],
          ['white', 'سفید'],
        ]),
        ordering('The sky is blue', 'آسمان آبی است'),
      ],
    },
    {
      id: 'A1-4-2',
      title: 'رنگ‌های بیشتر',
      words: [
        w('black', 'سیاه', '/blæk/'),
        w('pink', 'صورتی', '/pɪŋk/'),
        w('orange', 'نارنجی', '/ˈɔːrɪndʒ/'),
        w('brown', 'قهوه‌ای', '/braʊn/'),
        w('gray', 'خاکستری', '/ɡreɪ/'),
      ],
      grammar: grammar('What color is it?', 'برای پرسیدن رنگ چیزی از What color is it? استفاده کنید.', [
        ['What color is it?', 'رنگش چیست؟'],
        ['It is black.', 'سیاه است.'],
      ]),
      exercises: [
        choice('معنی "brown" چیست؟', ['قهوه‌ای', 'صورتی', 'نارنجی', 'خاکستری'], 0),
        listen(['خاکستری', 'سیاه', 'صورتی'], 0, 'gray'),
        translate('رنگش صورتی است.', ['It is pink.', 'It is orange.', 'It is brown.', 'It is gray.'], 0),
        matching([
          ['black', 'سیاه'],
          ['pink', 'صورتی'],
          ['orange', 'نارنجی'],
          ['brown', 'قهوه‌ای'],
        ]),
        ordering('It is black', 'سیاه است'),
      ],
    },
    {
      id: 'A1-4-3',
      title: 'وسایل کلاس',
      words: [
        w('book', 'کتاب', '/bʊk/'),
        w('pen', 'خودکار', '/pɛn/'),
        w('table', 'میز', '/ˈteɪbəl/'),
        w('chair', 'صندلی', '/tʃɛər/'),
        w('bag', 'کیف', '/bæɡ/'),
      ],
      grammar: grammar('This و That', 'this برای چیز نزدیک و that برای چیز دور به کار می‌رود.', [
        ['This is a book.', 'این یک کتاب است.'],
        ['That is a chair.', 'آن یک صندلی است.'],
      ]),
      exercises: [
        choice('معنی "table" چیست؟', ['صندلی', 'میز', 'کیف', 'کتاب'], 1),
        listen(['خودکار', 'کیف', 'کتاب'], 0, 'pen'),
        translate('این یک کیف است.', ['This is a bag.', 'That is a table.', 'This is a pen.', 'It is a chair.'], 0),
        matching([
          ['book', 'کتاب'],
          ['pen', 'خودکار'],
          ['chair', 'صندلی'],
          ['bag', 'کیف'],
        ]),
        ordering('This is a book', 'این یک کتاب است'),
      ],
    },
    {
      id: 'A1-4-4',
      title: 'وسایل خانه',
      words: [
        w('door', 'در', '/dɔːr/'),
        w('window', 'پنجره', '/ˈwɪndoʊ/'),
        w('clock', 'ساعت دیواری', '/klɑːk/'),
        w('key', 'کلید', '/kiː/'),
        w('lamp', 'چراغ', '/læmp/'),
      ],
      grammar: grammar('These', 'برای چند چیز از these و برای یک چیز از this استفاده کنید.', [
        ['These are keys.', 'اینها کلید هستند.'],
        ['This is a lamp.', 'این یک چراغ است.'],
      ]),
      exercises: [
        choice('معنی "key" چیست؟', ['در', 'کلید', 'ساعت', 'پنجره'], 1),
        listen(['چراغ', 'ساعت', 'در'], 0, 'lamp'),
        translate('این ساعت است.', ['This is a clock.', 'This is a door.', 'That is a lamp.', 'These are keys.'], 0),
        matching([
          ['door', 'در'],
          ['window', 'پنجره'],
          ['clock', 'ساعت دیواری'],
          ['lamp', 'چراغ'],
        ]),
        ordering('This is a door', 'این یک در است'),
      ],
    },
    {
      id: 'A1-4-5',
      title: 'پوشاک و ظروف',
      words: [
        w('bottle', 'بطری', '/ˈbɑːtəl/'),
        w('cup', 'فنجان', '/kʌp/'),
        w('shoe', 'کفش', '/ʃuː/'),
        w('hat', 'کلاه', '/hæt/'),
        w('shirt', 'پیراهن', '/ʃɜːrt/'),
      ],
      grammar: grammar('the با صفت', 'وقتی چیزی مشخص است، قبل از آن the بگذارید.', [
        ['The shoe is black.', 'کفش سیاه است.'],
        ['A hat is on the table.', 'یک کلاه روی میز است.'],
      ]),
      exercises: [
        choice('معنی "hat" چیست؟', ['کفش', 'کلاه', 'پیراهن', 'فنجان'], 1),
        listen(['کفش', 'پیراهن', 'کلاه'], 1, 'shirt'),
        translate('کفش سیاه', ['The black shoe.', 'The red hat.', 'The white cup.', 'The blue shirt.'], 0),
        matching([
          ['bottle', 'بطری'],
          ['cup', 'فنجان'],
          ['shoe', 'کفش'],
          ['shirt', 'پیراهن'],
        ]),
        ordering('The shoe is black', 'کفش سیاه است'),
      ],
    },
  ],
};
