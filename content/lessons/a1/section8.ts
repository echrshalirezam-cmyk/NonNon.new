import type { LessonSection } from '@/types/lesson';
import { choice, grammar, listen, matching, ordering, translate, w } from '@/content/lessons/builders';

export const a1Section8: LessonSection = {
  id: 'A1-8',
  level: 'A1',
  index: 8,
  title: 'حیوانات و طبیعت',
  lessons: [
    {
      id: 'A1-8-1',
      title: 'حیوانات اهلی',
      words: [
        w('cat', 'گربه', '/kæt/'),
        w('dog', 'سگ', '/dɔːɡ/'),
        w('bird', 'پرنده', '/bɜːrd/'),
        w('horse', 'اسب', '/hɔːrs/'),
        w('cow', 'گاو', '/kaʊ/'),
      ],
      grammar: grammar('جمع با s', 'برای بیشتر از یک حیوان، s به آخر اسم اضافه کنید.', [
        ['Two cats.', 'دو گربه.'],
        ['Three dogs.', 'سه سگ.'],
      ]),
      exercises: [
        choice('معنی "bird" چیست؟', ['سگ', 'گربه', 'پرنده', 'اسب'], 2),
        listen(['اسب', 'گاو', 'گربه'], 0, 'horse'),
        translate('دو گربه', ['Two cats.', 'Two dog.', 'Three cats.', 'Two cows.'], 0),
        matching([
          ['cat', 'گربه'],
          ['dog', 'سگ'],
          ['bird', 'پرنده'],
          ['cow', 'گاو'],
        ]),
        ordering('Two cats', 'دو گربه'),
      ],
    },
    {
      id: 'A1-8-2',
      title: 'حیوانات وحشی',
      words: [
        w('fish', 'ماهی', '/fɪʃ/'),
        w('lion', 'شیر', '/ˈlaɪən/'),
        w('monkey', 'میمون', '/ˈmʌŋki/'),
        w('rabbit', 'خرگوش', '/ˈræbɪt/'),
        w('snake', 'مار', '/sneɪk/'),
      ],
      grammar: grammar('It و They', 'برای یک حیوان از it و برای چند حیوان از they استفاده کنید.', [
        ['It is a snake.', 'این یک مار است.'],
        ['They are rabbits.', 'آن‌ها خرگوش هستند.'],
      ]),
      exercises: [
        choice('معنی "snake" چیست؟', ['مار', 'خرگوش', 'میمون', 'شیر'], 0),
        listen(['میمون', 'خرگوش', 'مار'], 0, 'monkey'),
        translate('آن‌ها خرگوش هستند.', ['They are rabbits.', 'It is a lion.', 'They are snakes.', 'It is a monkey.'], 0),
        matching([
          ['fish', 'ماهی'],
          ['lion', 'شیر'],
          ['monkey', 'میمون'],
          ['rabbit', 'خرگوش'],
        ]),
        ordering('They are rabbits', 'آن‌ها خرگوش هستند'),
      ],
    },
    {
      id: 'A1-8-3',
      title: 'گیاهان و کوه‌ها',
      words: [
        w('tree', 'درخت', '/triː/'),
        w('flower', 'گل', '/ˈflaʊər/'),
        w('grass', 'علف', '/ɡræs/'),
        w('river', 'رودخانه', '/ˈrɪvər/'),
        w('mountain', 'کوه', '/ˈmaʊntən/'),
      ],
      grammar: grammar('This is a + صفت', 'برای توصیف یک چیز، بین a و اسم صفت قرار دهید.', [
        ['It is a big tree.', 'این یک درخت بزرگ است.'],
        ['The river is long.', 'رودخانه طولانی است.'],
      ]),
      exercises: [
        choice('معنی "river" چیست؟', ['کوه', 'رودخانه', 'گل', 'علف'], 1),
        listen(['کوه', 'درخت', 'گل'], 0, 'mountain'),
        translate('این یک درخت است.', ['This is a tree.', 'This is a flower.', 'That is a river.', 'This is a mountain.'], 0),
        matching([
          ['tree', 'درخت'],
          ['flower', 'گل'],
          ['grass', 'علف'],
          ['mountain', 'کوه'],
        ]),
        ordering('This is a tree', 'این یک درخت است'),
      ],
    },
    {
      id: 'A1-8-4',
      title: 'آسمان',
      words: [
        w('sun', 'خورشید', '/sʌn/'),
        w('moon', 'ماه', '/muːn/'),
        w('star', 'ستاره', '/stɑːr/'),
        w('sky', 'آسمان', '/skaɪ/'),
        w('cloud', 'ابر', '/klaʊd/'),
      ],
      grammar: grammar('The + طبیعت', 'برای اشیای آسمانی از the قبل از اسم استفاده کنید.', [
        ['The sun is hot.', 'خورشید داغ است.'],
        ['The moon is in the sky.', 'ماه در آسمان است.'],
      ]),
      exercises: [
        choice('معنی "moon" چیست؟', ['خورشید', 'ماه', 'ستاره', 'ابر'], 1),
        listen(['ابر', 'آسمان', 'ستاره'], 0, 'cloud'),
        translate('ماه در آسمان است.', ['The moon is in the sky.', 'The sun is in the river.', 'The star is on the tree.', 'The cloud is on the mountain.'], 0),
        matching([
          ['sun', 'خورشید'],
          ['moon', 'ماه'],
          ['star', 'ستاره'],
          ['sky', 'آسمان'],
        ]),
        ordering('The moon is in the sky', 'ماه در آسمان است'),
      ],
    },
    {
      id: 'A1-8-5',
      title: 'آب و هوای طبیعی',
      words: [
        w('rain', 'باران', '/reɪn/'),
        w('snow', 'برف', '/snoʊ/'),
        w('wind', 'باد', '/wɪnd/'),
        w('ice', 'یخ', '/aɪs/'),
        w('fire', 'آتش', '/ˈfaɪər/'),
      ],
      grammar: grammar('It is', 'برای گفتن وضعیت هوا از It is به همراه کلمه مربوطه استفاده کنید.', [
        ['It is raining.', 'باران می‌بارد.'],
        ['The ice is cold.', 'یخ سرد است.'],
      ]),
      exercises: [
        choice('معنی "snow" چیست؟', ['باد', 'برف', 'آتش', 'یخ'], 1),
        listen(['باران', 'باد', 'آتش'], 0, 'rain'),
        translate('آتش داغ است.', ['The fire is hot.', 'The ice is hot.', 'The rain is hot.', 'The wind is hot.'], 0),
        matching([
          ['rain', 'باران'],
          ['snow', 'برف'],
          ['wind', 'باد'],
          ['ice', 'یخ'],
        ]),
        ordering('The fire is hot', 'آتش داغ است'),
      ],
    },
  ],
};
