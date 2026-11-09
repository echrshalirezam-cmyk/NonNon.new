import type { LessonSection } from '@/types/lesson';
import { choice, grammar, listen, matching, ordering, translate, w } from '@/content/lessons/builders';

export const a1Section7: LessonSection = {
  id: 'A1-7',
  level: 'A1',
  index: 7,
  title: 'خانه و مکان‌ها',
  lessons: [
    {
      id: 'A1-7-1',
      title: 'اتاق‌های خانه',
      words: [
        w('house', 'خانه', '/haʊs/'),
        w('room', 'اتاق', '/ruːm/'),
        w('kitchen', 'آشپزخانه', '/ˈkɪtʃɪn/'),
        w('bathroom', 'حمام', '/ˈbæθruːm/'),
        w('bed', 'تخت', '/bɛd/'),
      ],
      grammar: grammar('my و your', 'برای نشان دادن مالکیت از my به معنی «من» و your به معنی «شما» استفاده کنید.', [
        ['My room is big.', 'اتاق من بزرگ است.'],
        ['My house is small.', 'خانه من کوچک است.'],
      ]),
      exercises: [
        choice('معنی "kitchen" چیست؟', ['حمام', 'آشپزخانه', 'اتاق', 'خانه'], 1),
        listen(['تخت', 'در', 'میز'], 0, 'bed'),
        translate('اتاق من بزرگ است.', ['My room is big.', 'My house is red.', 'My bed is small.', 'My kitchen is blue.'], 0),
        matching([
          ['house', 'خانه'],
          ['room', 'اتاق'],
          ['bathroom', 'حمام'],
          ['bed', 'تخت'],
        ]),
        ordering('My house is small', 'خانه من کوچک است'),
      ],
    },
    {
      id: 'A1-7-2',
      title: 'حرف‌های اضافه مکان',
      words: [
        w('in', 'در / داخل', '/ɪn/'),
        w('on', 'روی', '/ɒn/'),
        w('under', 'زیر', '/ˈʌndər/'),
        w('next to', 'کنار', '/nɛkst tuː/'),
        w('behind', 'پشت', '/bɪˈhaɪnd/'),
      ],
      grammar: grammar('حروف اضافه مکان', 'برای گفتن جای چیزی از in، on، under و behind قبل از مکان استفاده کنید.', [
        ['The book is on the table.', 'کتاب روی میز است.'],
        ['The cat is under the bed.', 'گربه زیر تخت است.'],
      ]),
      exercises: [
        choice('معنی "under" چیست؟', ['روی', 'زیر', 'پشت', 'در'], 1),
        listen(['پشت', 'کنار', 'زیر'], 0, 'behind'),
        translate('کتاب روی میز است.', ['The book is on the table.', 'The book is under the table.', 'The pen is in the bag.', 'The table is on the book.'], 0),
        matching([
          ['in', 'در'],
          ['on', 'روی'],
          ['under', 'زیر'],
          ['behind', 'پشت'],
        ]),
        ordering('The book is on the table', 'کتاب روی میز است'),
      ],
    },
    {
      id: 'A1-7-3',
      title: 'وجود داشتن',
      words: [
        w('there is', 'هست', '/ðɛr ɪz/'),
        w('there are', 'هستند', '/ðɛr ɑːr/'),
        w('school', 'مدرسه', '/skuːl/'),
        w('park', 'پارک', '/pɑːrk/'),
        w('shop', 'فروشگاه', '/ʃɒp/'),
      ],
      grammar: grammar('There is / There are', 'برای گفتن وجود چیزی از there is برای یک چیز و there are برای چند چیز استفاده کنید.', [
        ['There is a park.', 'یک پارک هست.'],
        ['There are two shops.', 'دو فروشگاه هست.'],
      ]),
      exercises: [
        choice('معنی "school" چیست؟', ['پارک', 'مدرسه', 'فروشگاه', 'خانه'], 1),
        listen(['فروشگاه', 'پارک', 'اتاق'], 0, 'shop'),
        translate('یک مدرسه هست.', ['There is a school.', 'There are a school.', 'There is two schools.', 'There are shop.'], 0),
        matching([
          ['there is', 'هست'],
          ['there are', 'هستند'],
          ['school', 'مدرسه'],
          ['park', 'پارک'],
        ]),
        ordering('There is a park', 'یک پارک هست'),
      ],
    },
    {
      id: 'A1-7-4',
      title: 'شهر و خیابان',
      words: [
        w('city', 'شهر', '/ˈsɪti/'),
        w('street', 'خیابان', '/striːt/'),
        w('hospital', 'بیمارستان', '/ˈhɒspɪtəl/'),
        w('bank', 'بانک', '/bæŋk/'),
        w('station', 'ایستگاه', '/ˈsteɪʃən/'),
      ],
      grammar: grammar('Where is', 'برای پرسیدن مکان چیزی از Where is استفاده کنید.', [
        ['Where is the bank?', 'بانک کجاست؟'],
        ['The hospital is on this street.', 'بیمارستان در این خیابان است.'],
      ]),
      exercises: [
        choice('معنی "street" چیست؟', ['شهر', 'خیابان', 'ایستگاه', 'بانک'], 1),
        listen(['بیمارستان', 'بانک', 'ایستگاه'], 0, 'hospital'),
        translate('بانک کجاست؟', ['Where is the bank?', 'What is the city?', 'Where is the street?', 'Who is the hospital?'], 0),
        matching([
          ['city', 'شهر'],
          ['street', 'خیابان'],
          ['hospital', 'بیمارستان'],
          ['station', 'ایستگاه'],
        ]),
        ordering('Where is the bank', 'بانک کجاست؟'),
      ],
    },
    {
      id: 'A1-7-5',
      title: 'بخش‌های خانه',
      words: [
        w('garden', 'باغ', '/ˈɡɑːrdən/'),
        w('balcony', 'بالکن', '/ˈbælkəni/'),
        w('stairs', 'پله', '/stɛərz/'),
        w('roof', 'پشت‌بام', '/ruːf/'),
        w('floor', 'طبقه', '/flɔːr/'),
      ],
      grammar: grammar('the برای مکان‌های مشخص', 'وقتی مکانی مشخص است، قبل از آن the بگذارید.', [
        ['The garden is big.', 'باغ بزرگ است.'],
        ['The stairs are next to the door.', 'پله‌ها کنار در هستند.'],
      ]),
      exercises: [
        choice('معنی "garden" چیست؟', ['باغ', 'بالکن', 'پله', 'پشت‌بام'], 0),
        listen(['کف', 'پشت‌بام', 'طبقه'], 1, 'roof'),
        translate('باغ بزرگ است.', ['The garden is big.', 'The roof is small.', 'The floor is red.', 'The stairs are blue.'], 0),
        matching([
          ['garden', 'باغ'],
          ['balcony', 'بالکن'],
          ['stairs', 'پله'],
          ['roof', 'پشت‌بام'],
        ]),
        ordering('The garden is big', 'باغ بزرگ است'),
      ],
    },
  ],
};
