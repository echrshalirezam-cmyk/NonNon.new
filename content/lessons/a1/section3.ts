import type { LessonSection } from '@/types/lesson';
import { choice, grammar, listen, matching, ordering, translate, w } from '@/content/lessons/builders';

export const a1Section3: LessonSection = {
  id: 'A1-3',
  level: 'A1',
  index: 3,
  title: 'اعداد',
  lessons: [
    {
      id: 'A1-3-1',
      title: 'شمارش از یک تا پنج',
      words: [
        w('one', 'یک', '/wʌn/'),
        w('two', 'دو', '/tuː/'),
        w('three', 'سه', '/θriː/'),
        w('four', 'چهار', '/fɔːr/'),
        w('five', 'پنج', '/faɪv/'),
      ],
      grammar: grammar('شمارش', 'اعداد را به ترتیب از یک تا ده یاد بگیرید.', [
        ['One, two, three.', 'یک، دو، سه.'],
        ['I have five books.', 'من پنج کتاب دارم.'],
      ]),
      exercises: [
        choice('معنی "four" چیست؟', ['سه', 'چهار', 'پنج', 'دو'], 1),
        listen(['پنج', 'شش', 'چهار'], 0, 'five'),
        translate('عدد سه', ['Two', 'Three', 'Four', 'Five'], 1),
        matching([
          ['one', 'یک'],
          ['two', 'دو'],
          ['three', 'سه'],
          ['five', 'پنج'],
        ]),
        ordering('One two three', 'یک، دو، سه'),
      ],
    },
    {
      id: 'A1-3-2',
      title: 'شمارش از شش تا ده',
      words: [
        w('six', 'شش', '/sɪks/'),
        w('seven', 'هفت', '/ˈsɛvən/'),
        w('eight', 'هشت', '/eɪt/'),
        w('nine', 'نُه', '/naɪn/'),
        w('ten', 'ده', '/tɛn/'),
      ],
      grammar: grammar('تعداد اشیا', 'برای گفتن تعداد چیزها، عدد را قبل از اسم قرار دهید.', [
        ['I have seven pens.', 'من هفت خودکار دارم.'],
        ['I have ten books.', 'من ده کتاب دارم.'],
      ]),
      exercises: [
        choice('معنی "eight" چیست؟', ['شش', 'هفت', 'هشت', 'نُه'], 2),
        listen(['نُه', 'ده', 'هفت'], 1, 'ten'),
        translate('عدد هفت', ['Six', 'Seven', 'Eight', 'Nine'], 1),
        matching([
          ['six', 'شش'],
          ['seven', 'هفت'],
          ['nine', 'نُه'],
          ['ten', 'ده'],
        ]),
        ordering('Six seven eight', 'شش، هفت، هشت'),
      ],
    },
    {
      id: 'A1-3-3',
      title: 'صفر و ترتیب',
      words: [
        w('zero', 'صفر', '/ˈzɪroʊ/'),
        w('first', 'اول', '/fɜːrst/'),
        w('second', 'دوم', '/ˈsɛkənd/'),
        w('third', 'سوم', '/θɜːrd/'),
        w('last', 'آخر', '/læst/'),
      ],
      grammar: grammar('عدد ترتیبی', 'برای گفتن ترتیب از the به همراه عدد ترتیبی استفاده کنید.', [
        ['It is the first day.', 'این اولین روز است.'],
        ['He is the last.', 'او آخری است.'],
      ]),
      exercises: [
        choice('معنی "zero" چیست؟', ['یک', 'صفر', 'ده', 'صد'], 1),
        listen(['اول', 'آخر', 'دوم'], 0, 'first'),
        translate('روز دوم', ['The second day.', 'The third day.', 'The first day.', 'The last day.'], 0),
        matching([
          ['zero', 'صفر'],
          ['first', 'اول'],
          ['third', 'سوم'],
          ['last', 'آخر'],
        ]),
        ordering('The first day', 'روز اول'),
      ],
    },
    {
      id: 'A1-3-4',
      title: 'زیاد و کم',
      words: [
        w('how many', 'چند تا', '/haʊ ˈmɛni/'),
        w('many', 'زیاد', '/ˈmɛni/'),
        w('few', 'کم', '/fjuː/'),
        w('more', 'بیشتر', '/mɔːr/'),
        w('less', 'کمتر', '/lɛs/'),
      ],
      grammar: grammar('How many?', 'برای پرسیدن تعداد از How many و برای اسم‌های قابل شمارش استفاده کنید.', [
        ['How many books?', 'چند کتاب؟'],
        ['There are many people.', 'مردم زیادی هستند.'],
      ]),
      exercises: [
        choice('معنی "few" چیست؟', ['زیاد', 'کم', 'بیشتر', 'کمتر'], 1),
        listen(['کم', 'زیاد', 'کمتر'], 1, 'many'),
        translate('چند تا کتاب؟', ['How many books?', 'How much water?', 'Where is the book?', 'What is the book?'], 0),
        matching([
          ['how many', 'چند تا'],
          ['many', 'زیاد'],
          ['few', 'کم'],
          ['more', 'بیشتر'],
        ]),
        ordering('How many books', 'چند کتاب'),
      ],
    },
    {
      id: 'A1-3-5',
      title: 'اعداد در زندگی',
      words: [
        w('phone', 'تلفن', '/foʊn/'),
        w('number', 'شماره', '/ˈnʌmbər/'),
        w('age', 'سن', '/eɪdʒ/'),
        w('year', 'سال', '/jɪər/'),
        w('price', 'قیمت', '/praɪs/'),
      ],
      grammar: grammar('سن و شماره', 'برای گفتن سن از my age is و برای شماره از my phone number is استفاده کنید.', [
        ['What is your age?', 'سن شما چند است؟'],
        ['My age is ten.', 'سن من ده است.'],
      ]),
      exercises: [
        choice('معنی "age" چیست؟', ['قیمت', 'سن', 'شماره', 'سال'], 1),
        listen(['تلفن', 'قیمت', 'شماره'], 0, 'phone'),
        translate('شماره تلفن من', ['My phone number', 'My name number', 'Phone is my name', 'My price age'], 0),
        matching([
          ['phone', 'تلفن'],
          ['number', 'شماره'],
          ['year', 'سال'],
          ['price', 'قیمت'],
        ]),
        ordering('My age is ten', 'سن من ده است'),
      ],
    },
  ],
};
