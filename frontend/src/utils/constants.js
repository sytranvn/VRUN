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
  { label: 'Đang chấm điểm', value: 'FINISHED' },
  { label: 'Đã chấm điểm', value: 'ASSESSED' },
  { label: 'Bị huỷ kết quả', value: 'CANCELED' },
];

export const STATUS_OPTIONS = [
  { label: 'Nháp', value: 'DRAFT' },
  { label: 'Đã duyệt', value: 'ACTIVE' },
];
