export const TOKEN_KEY = 'vlxx';

export const ROLE_OPTIONS = [
  { label: 'Học viên', value: 'CANDIDATE' },
  { label: 'Người ra đề', value: 'EXAMINER' },
];

export const SKILL_OPTIONS = [
  { label: 'Nghe', value: 'LISTENING' },
  { label: 'Nói', value: 'SPEAKING' },
  { label: 'Đọc', value: 'READING' },
  { label: 'Viết', value: 'WRITING' },
];

export const CANDIDATE_EXAM_STATUS = [
  { label: 'Đã đặt hẹn', value: 'SCHEDULED' },
  { label: 'Đang thi', value: 'STARTED' },
  { label: 'Đã kết thúc', value: 'FINISHED' },
  { label: 'Đang chấm điểm', value: 'ASSESSED' },
  { label: 'Bị huỷ kết quả', value: 'CANCELED' },
];

export const STATUS_OPTIONS = [
  { label: 'Nháp', value: 'DRAFT' },
  { label: 'Đã duyệt', value: 'ACTIVE' },
];

export const EXAM_ANCHOR = [
  {
    key: 'listening',
    href: '#listening',
    title: 'Listening - 35 câu',
    children: [
      {
        key: 'listening-p1',
        href: '#listening-p1',
        title: 'Part 1',
      },
      {
        key: 'listening-p2',
        href: '#listening-p2',
        title: 'Part 2',
      },
      {
        key: 'listening-p3',
        href: '#listening-p3',
        title: 'Part 3',
      },
    ],
  },
  {
    key: 'reading',
    href: '#reading',
    title: 'Reading - 40 câu',
    children: [
      {
        key: 'reading-p1',
        href: '#reading-p1',
        title: 'Part 1',
      },
      {
        key: 'reading-p2',
        href: '#reading-p2',
        title: 'Part 2',
      },
      {
        key: 'reading-p3',
        href: '#reading-p3',
        title: 'Part 3',
      },
      {
        key: 'reading-p4',
        href: '#reading-p4',
        title: 'Part 4',
      },
    ],
  },
  {
    key: 'writing',
    href: '#writing',
    title: 'Writing - 2 phần',
    children: [
      {
        key: 'writing-p1',
        href: '#writing-p1',
        title: 'Part 1',
      },
      {
        key: 'writing-p2',
        href: '#writing-p2',
        title: 'Part 2',
      },
    ],
  },
  {
    key: 'speaking',
    href: '#speaking',
    title: 'Speaking - 3 phần',
    children: [
      {
        key: 'speaking-p1',
        href: '#speaking-p1',
        title: 'Part 1',
      },
      {
        key: 'speaking-p2',
        href: '#speaking-p2',
        title: 'Part 2',
      },
      {
        key: 'speaking-p3',
        href: '#speaking-p3',
        title: 'Part 3',
      },
    ],
  },
];
