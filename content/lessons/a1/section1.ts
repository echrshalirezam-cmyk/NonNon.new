import type { LessonSection } from '@/types/lesson';
import { choice, grammar, listen, matching, ordering, translate, w } from '@/content/lessons/builders';

export const a1Section1: LessonSection = {
  id: 'A1-1',
  level: 'A1',
  index: 1,
  title: 'سلام و معارفه',
  lessons: [
    {
      id: 'A1-1-1',
      title: 'سلام کردن',
      words: [
        w('hello', 'سلام', '/həˈloʊ/'),
        w('hi', 'سلام (غیررسمی)', '/haɪ/'),
        w('goodbye', 'خداحافظ', '/ˌɡʊdˈbaɪ/'),
        w('yes', 'بله', '/jɛs/'),
        w('no', 'نه', '/noʊ/'),
      ],
      grammar: grammar('Hello و Hi', 'برای سلام کردن از hello یا hi استفاده کنید.', [
        ['Hello, Ali.', 'سلام، علی.'],
        ['Hi, Sara!', 'سلام، سارا!'],
      ]),
      exercises: [
        choice('معنی "goodbye" چیست؟', ['سلام', 'خداحافظ', 'بله', 'نه'], 1),
        listen(['خداحافظ', 'سلام', 'نه'], 1, 'hello'),
        translate('بله', ['No', 'Yes', 'Hello', 'Goodbye'], 1),
        matching([
          ['hello', 'سلام'],
          ['goodbye', 'خداحافظ'],
          ['no', 'نه'],
        ]),
        ordering('Hi Sara', 'سلام سارا'),
      ],
    },
    {
      id: 'A1-1-2',
      title: 'معرفی خودتان',
      words: [
        w('I', 'من', '/aɪ/'),
        w('am', 'هستم', '/æm/'),
        w('name', 'نام', '/neɪm/'),
        w('my', 'مال من', '/maɪ/'),
        w('you', 'تو / شما', '/juː/'),
      ],
      grammar: grammar('I am', 'با I از am استفاده می‌شود و معنی «هستم» می‌دهد.', [
        ['I am Mina.', 'من مینا هستم.'],
        ['My name is Ali.', 'نام من علی است.'],
      ]),
      exercises: [
        choice('معنی "my" چیست؟', ['مال من', 'شما', 'او', 'ما'], 0),
        listen(['سن', 'نام', 'شهر'], 1, 'name'),
        translate('من علی هستم.', ['You are Ali.', 'I am Ali.', 'She is Ali.', 'We are Ali.'], 1),
        matching([
          ['I', 'من'],
          ['my', 'مال من'],
          ['you', 'تو'],
          ['name', 'نام'],
        ]),
        ordering('My name is Ali', 'نام من علی است'),
      ],
    },
    {
      id: 'A1-1-3',
      title: 'احوال‌پرسی',
      words: [
        w('how', 'چطور', '/haʊ/'),
        w('are', 'هستی / هستید', '/ɑːr/'),
        w('you', 'تو / شما', '/juː/'),
        w('fine', 'خوب', '/faɪn/'),
        w('thanks', 'ممنون', '/θæŋks/'),
      ],
      grammar: grammar('How are you?', 'برای پرسیدن حال کسی از How are you? استفاده کنید.', [
        ['How are you?', 'حال شما چطور است؟'],
        ['I am fine, thanks.', 'خوبم، ممنون.'],
      ]),
      exercises: [
        choice('معنی "fine" چیست؟', ['خسته', 'خوب', 'گرسنه', 'خوشحال'], 1),
        listen(['ببخشید', 'ممنون', 'لطفاً'], 1, 'thanks'),
        translate('حال شما چطور است؟', ['Where are you?', 'How are you?', 'What is your name?', 'Who are you?'], 1),
        matching([
          ['how', 'چطور'],
          ['are', 'هستید'],
          ['fine', 'خوب'],
          ['thanks', 'ممنون'],
        ]),
        ordering('I am fine thanks', 'خوبم، ممنون'),
      ],
    },
    {
      id: 'A1-1-4',
      title: 'خداحافظی',
      words: [
        w('bye', 'خداحافظ', '/baɪ/'),
        w('morning', 'صبح', '/ˈmɔːrnɪŋ/'),
        w('night', 'شب', '/naɪt/'),
        w('good', 'خوب', '/ɡʊd/'),
        w('see', 'دیدن', '/siː/'),
      ],
      grammar: grammar('Good morning و Good night', 'برای سلام و خداحافظی در زمان‌های مختلف روز از good استفاده کنید.', [
        ['Good morning, Sara.', 'صبح بخیر، سارا.'],
        ['Good night!', 'شب بخیر!'],
      ]),
      exercises: [
        choice('معنی "morning" چیست؟', ['شب', 'صبح', 'ظهر', 'عصر'], 1),
        listen(['سلام', 'خداحافظ', 'ممنون'], 1, 'bye'),
        translate('صبح بخیر', ['Good night', 'Good morning', 'Good bye', 'See you'], 1),
        matching([
          ['good', 'خوب'],
          ['night', 'شب'],
          ['see', 'دیدن'],
          ['bye', 'خداحافظ'],
        ]),
        ordering('Good night Sara', 'شب بخیر سارا'),
      ],
    },
    {
      id: 'A1-1-5',
      title: 'مرور معارفه',
      words: [
        w('please', 'لطفاً', '/pliːz/'),
        w('sorry', 'متأسفم', '/ˈsɑːri/'),
        w('welcome', 'خوش آمدید', '/ˈwɛlkəm/'),
        w('nice', 'دلپذیر', '/naɪs/'),
        w('meet', 'ملاقات کردن', '/miːt/'),
      ],
      grammar: grammar('Nice to meet you', 'برای خوشامدگویی به کسی تازه‌آشنا از این عبارت استفاده کنید.', [
        ['Nice to meet you.', 'از ملاقات شما خوشحالم.'],
        ['Sorry, I am late.', 'متأسفم، دیرم شد.'],
      ]),
      exercises: [
        choice('معنی "sorry" چیست؟', ['متأسفم', 'لطفاً', 'خوشحال', 'بله'], 0),
        listen(['خوش آمدید', 'خداحافظ', 'ببخشید'], 0, 'welcome'),
        translate('از ملاقات شما خوشحالم.', ['Nice to meet you.', 'Welcome to school.', 'Sorry, goodbye.', 'Please, yes.'], 0),
        matching([
          ['please', 'لطفاً'],
          ['sorry', 'متأسفم'],
          ['welcome', 'خوش آمدید'],
          ['nice', 'دلپذیر'],
        ]),
        ordering('Nice to meet you', 'از ملاقات شما خوشحالم'),
      ],
    },
  ],
};
