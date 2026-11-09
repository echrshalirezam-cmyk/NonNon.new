import type { LessonSection } from '@/types/lesson';
import { choice, grammar, listen, matching, ordering, translate, w } from '@/content/lessons/builders';

export const a1Section2: LessonSection = {
  id: 'A1-2',
  level: 'A1',
  index: 2,
  title: 'خانواده و آدم‌ها',
  lessons: [
    {
      id: 'A1-2-1',
      title: 'خانواده',
      words: [
        w('mother', 'مادر', '/ˈmʌðər/'),
        w('father', 'پدر', '/ˈfɑːðər/'),
        w('sister', 'خواهر', '/ˈsɪstər/'),
        w('brother', 'برادر', '/ˈbrʌðər/'),
        w('family', 'خانواده', '/ˈfæməli/'),
      ],
      grammar: grammar('This is', 'برای معرفی کسی یا چیزی از this is استفاده کنید.', [
        ['This is my mother.', 'این مادر من است.'],
        ['This is my family.', 'این خانواده من است.'],
      ]),
      exercises: [
        choice('معنی "father" چیست؟', ['مادر', 'پدر', 'برادر', 'خواهر'], 1),
        listen(['برادر', 'خواهر', 'مادر'], 1, 'sister'),
        translate('این برادر من است.', ['This is my brother.', 'This is my sister.', 'This is my father.', 'My mother is here.'], 0),
        matching([
          ['mother', 'مادر'],
          ['father', 'پدر'],
          ['sister', 'خواهر'],
          ['brother', 'برادر'],
        ]),
        ordering('This is my mother', 'این مادر من است'),
      ],
    },
    {
      id: 'A1-2-2',
      title: 'دوستان',
      words: [
        w('friend', 'دوست', '/frend/'),
        w('boy', 'پسر', '/bɔɪ/'),
        w('girl', 'دختر', '/ɡɜːrl/'),
        w('man', 'مرد', '/mæn/'),
        w('woman', 'زن', '/ˈwʊmən/'),
      ],
      grammar: grammar('a و an', 'قبل از اسم‌های مفرد از a یا an به معنی «یک» استفاده کنید. an قبل از صدای حرف صدادار می‌آید.', [
        ['She is a girl.', 'او یک دختر است.'],
        ['It is an apple.', 'این یک سیب است.'],
      ]),
      exercises: [
        choice('معنی "woman" چیست؟', ['مرد', 'زن', 'دختر', 'پسر'], 1),
        listen(['دوست', 'معلم', 'همسایه'], 0, 'friend'),
        translate('او یک پسر است.', ['She is a girl.', 'He is a boy.', 'I am a man.', 'We are friends.'], 1),
        matching([
          ['friend', 'دوست'],
          ['boy', 'پسر'],
          ['girl', 'دختر'],
          ['man', 'مرد'],
        ]),
        ordering('She is a girl', 'او یک دختر است'),
      ],
    },
    {
      id: 'A1-2-3',
      title: 'معرفی شغل',
      words: [
        w('he', 'او (مرد)', '/hiː/'),
        w('she', 'او (زن)', '/ʃiː/'),
        w('it', 'آن / این (چیز)', '/ɪt/'),
        w('teacher', 'معلم', '/ˈtiːtʃər/'),
        w('doctor', 'پزشک', '/ˈdɑːktər/'),
      ],
      grammar: grammar('He / She / It is', 'برای مرد، زن و چیز از he، she و it به همراه is استفاده کنید.', [
        ['He is my teacher.', 'او معلم من است.'],
        ['She is a doctor.', 'او پزشک است.'],
      ]),
      exercises: [
        choice('معنی "doctor" چیست؟', ['معلم', 'پزشک', 'پلیس', 'مهندس'], 1),
        listen(['پزشک', 'معلم', 'دانش‌آموز'], 1, 'teacher'),
        translate('او معلم من است.', ['He is my teacher.', 'She is my doctor.', 'It is my book.', 'You are my friend.'], 0),
        matching([
          ['he', 'او (مرد)'],
          ['she', 'او (زن)'],
          ['it', 'آن'],
          ['teacher', 'معلم'],
        ]),
        ordering('He is my teacher', 'او معلم من است'),
      ],
    },
    {
      id: 'A1-2-4',
      title: 'صفت‌های ظاهری',
      words: [
        w('tall', 'بلند', '/tɔːl/'),
        w('short', 'کوتاه', '/ʃɔːrt/'),
        w('young', 'جوان', '/jʌŋ/'),
        w('old', 'پیر', '/oʊld/'),
        w('kind', 'مهربان', '/kaɪnd/'),
      ],
      grammar: grammar('صفت بعد از is', 'بعد از is یا am صفت می‌آید تا حالت کسی را توصیف کند.', [
        ['He is tall.', 'او قد بلند است.'],
        ['She is kind.', 'او مهربان است.'],
      ]),
      exercises: [
        choice('معنی "short" چیست؟', ['بلند', 'کوتاه', 'پیر', 'جوان'], 1),
        listen(['مهربان', 'خسته', 'عصبانی'], 0, 'kind'),
        translate('او جوان است.', ['He is old.', 'She is young.', 'He is short.', 'She is tall.'], 1),
        matching([
          ['tall', 'بلند'],
          ['short', 'کوتاه'],
          ['young', 'جوان'],
          ['old', 'پیر'],
        ]),
        ordering('She is kind', 'او مهربان است'),
      ],
    },
    {
      id: 'A1-2-5',
      title: 'مرور خانواده',
      words: [
        w('baby', 'نوزاد', '/ˈbeɪbi/'),
        w('child', 'کودک', '/tʃaɪld/'),
        w('parent', 'والدین', '/ˈpɛrənt/'),
        w('grandmother', 'مادربزرگ', '/ˈɡrænˌmʌðər/'),
        w('grandfather', 'پدربزرگ', '/ˈɡrænˌfɑːðər/'),
      ],
      grammar: grammar('جمع با s', 'برای جمع بیشتر اسم‌ها یک s به آخر آن اضافه کنید.', [
        ['Two friends.', 'دو دوست.'],
        ['Three sisters.', 'سه خواهر.'],
      ]),
      exercises: [
        choice('معنی "child" چیست؟', ['نوزاد', 'کودک', 'پدربزرگ', 'والدین'], 1),
        listen(['مادربزرگ', 'پدربزرگ', 'مادر'], 0, 'grandmother'),
        translate('دو خواهر', ['Two sisters.', 'Two sister.', 'Sisters two.', 'Two brothers.'], 0),
        matching([
          ['baby', 'نوزاد'],
          ['child', 'کودک'],
          ['parent', 'والدین'],
          ['grandfather', 'پدربزرگ'],
        ]),
        ordering('This is my grandmother', 'این مادربزرگ من است'),
      ],
    },
  ],
};
