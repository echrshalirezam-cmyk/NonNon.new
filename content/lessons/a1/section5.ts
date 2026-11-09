import type { LessonSection } from '@/types/lesson';
import { choice, grammar, listen, matching, ordering, translate, w } from '@/content/lessons/builders';

export const a1Section5: LessonSection = {
  id: 'A1-5',
  level: 'A1',
  index: 5,
  title: 'غذا و نوشیدنی',
  lessons: [
    {
      id: 'A1-5-1',
      title: 'خوراکی‌های صبحانه',
      words: [
        w('apple', 'سیب', '/ˈæpəl/'),
        w('bread', 'نان', '/brɛd/'),
        w('rice', 'برنج', '/raɪs/'),
        w('egg', 'تخم‌مرغ', '/ɛɡ/'),
        w('milk', 'شیر', '/mɪlk/'),
      ],
      grammar: grammar('I like', 'برای گفتن علاقه از I like به همراه اسم استفاده کنید.', [
        ['I like apples.', 'من سیب دوست دارم.'],
        ['I like rice.', 'من برنج دوست دارم.'],
      ]),
      exercises: [
        choice('معنی "bread" چیست؟', ['برنج', 'نان', 'شیر', 'تخم‌مرغ'], 1),
        listen(['شیر', 'تخم‌مرغ', 'سیب'], 1, 'egg'),
        translate('من شیر دوست دارم.', ['I like milk.', 'I like bread.', 'I like apples.', 'Milk is red.'], 0),
        matching([
          ['apple', 'سیب'],
          ['bread', 'نان'],
          ['rice', 'برنج'],
          ['milk', 'شیر'],
        ]),
        ordering('I like bread', 'من نان دوست دارم'),
      ],
    },
    {
      id: 'A1-5-2',
      title: 'نوشیدنی‌ها',
      words: [
        w('water', 'آب', '/ˈwɔːtər/'),
        w('tea', 'چای', '/tiː/'),
        w('coffee', 'قهوه', '/ˈkɔːfi/'),
        w('juice', 'آبمیوه', '/dʒuːs/'),
        w('drink', 'نوشیدن', '/drɪŋk/'),
      ],
      grammar: grammar('I want', 'برای خواستن چیزی از I want استفاده کنید.', [
        ['I want water.', 'من آب می‌خواهم.'],
        ['I want a cup of tea.', 'من یک فنجان چای می‌خواهم.'],
      ]),
      exercises: [
        choice('معنی "juice" چیست؟', ['آب', 'چای', 'آبمیوه', 'قهوه'], 2),
        listen(['آب', 'چای', 'شیر'], 0, 'water'),
        translate('من چای می‌خواهم.', ['I want tea.', 'I want water.', 'I like coffee.', 'I drink juice.'], 0),
        matching([
          ['water', 'آب'],
          ['tea', 'چای'],
          ['coffee', 'قهوه'],
          ['drink', 'نوشیدن'],
        ]),
        ordering('I want tea', 'من چای می‌خواهم'),
      ],
    },
    {
      id: 'A1-5-3',
      title: 'میوه و سبزی',
      words: [
        w('fruit', 'میوه', '/fruːt/'),
        w('vegetable', 'سبزی', '/ˈvɛdʒtəbəl/'),
        w('banana', 'موز', '/bəˈnænə/'),
        w('meat', 'گوشت', '/miːt/'),
        w('fish', 'ماهی', '/fɪʃ/'),
      ],
      grammar: grammar('Do you like', 'برای پرسیدن علاقه از Do you like استفاده کنید.', [
        ['Do you like fish?', 'آیا ماهی دوست داری؟'],
        ['Yes, I do.', 'بله، دوست دارم.'],
      ]),
      exercises: [
        choice('معنی "meat" چیست؟', ['میوه', 'گوشت', 'سبزی', 'ماهی'], 1),
        listen(['موز', 'سیب', 'سبزی'], 0, 'banana'),
        translate('آیا میوه دوست داری؟', ['Do you like fruit?', 'Do you want meat?', 'I like vegetables.', 'Fish is red.'], 0),
        matching([
          ['fruit', 'میوه'],
          ['vegetable', 'سبزی'],
          ['banana', 'موز'],
          ['fish', 'ماهی'],
        ]),
        ordering('Do you like fish', 'آیا ماهی دوست داری؟'),
      ],
    },
    {
      id: 'A1-5-4',
      title: 'احساس گرسنگی و تشنگی',
      words: [
        w('hungry', 'گرسنه', '/ˈhʌŋɡri/'),
        w('thirsty', 'تشنه', '/ˈθɜːrsti/'),
        w('delicious', 'خوشمزه', '/dɪˈlɪʃəs/'),
        w('breakfast', 'صبحانه', '/ˈbrɛkfəst/'),
        w('lunch', 'ناهار', '/lʌntʃ/'),
      ],
      grammar: grammar('I am + حالت', 'برای گفتن حال بدن از I am به همراه صفت استفاده کنید.', [
        ['I am hungry.', 'من گرسنه‌ام.'],
        ['I am thirsty.', 'من تشنه‌ام.'],
      ]),
      exercises: [
        choice('معنی "thirsty" چیست؟', ['گرسنه', 'تشنه', 'خوشمزه', 'سیر'], 1),
        listen(['ناهار', 'صبحانه', 'شام'], 1, 'breakfast'),
        translate('من گرسنه هستم.', ['I am thirsty.', 'I am hungry.', 'I am delicious.', 'I am lunch.'], 1),
        matching([
          ['hungry', 'گرسنه'],
          ['thirsty', 'تشنه'],
          ['delicious', 'خوشمزه'],
          ['lunch', 'ناهار'],
        ]),
        ordering('I am hungry', 'من گرسنه‌ام'),
      ],
    },
    {
      id: 'A1-5-5',
      title: 'وعده‌های غذایی',
      words: [
        w('dinner', 'شام', '/ˈdɪnər/'),
        w('cake', 'کیک', '/keɪk/'),
        w('salt', 'نمک', '/sɔːlt/'),
        w('sugar', 'شکر', '/ˈʃʊɡər/'),
        w('soup', 'سوپ', '/suːp/'),
      ],
      grammar: grammar('some و any', 'some برای مثبت و any برای پرسش به کار می‌رود.', [
        ['I want some soup.', 'من کمی سوپ می‌خواهم.'],
        ['Do you have any cake?', 'آیا کیک داری؟'],
      ]),
      exercises: [
        choice('معنی "sugar" چیست؟', ['نمک', 'شکر', 'کیک', 'سوپ'], 1),
        listen(['شام', 'ناهار', 'صبحانه'], 0, 'dinner'),
        translate('من کمی سوپ می‌خواهم.', ['I want some soup.', 'I want salt cake.', 'I like sugar.', 'Soup is dinner.'], 0),
        matching([
          ['dinner', 'شام'],
          ['cake', 'کیک'],
          ['salt', 'نمک'],
          ['soup', 'سوپ'],
        ]),
        ordering('I want some soup', 'من کمی سوپ می‌خواهم'),
      ],
    },
  ],
};
