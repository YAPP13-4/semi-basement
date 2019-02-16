export const PENDING = 'pending';
export const FULFILLED = 'fulfilled';
export const REJECTED = 'rejected';

export const asyncState = stateName => {
  switch (stateName) {
    case PENDING:
    case FULFILLED:
    case REJECTED:
      return {
        pending: false,
        fulfilled: false,
        rejected: false,
        [stateName]: true
      };
    default:
      return {
        pending: false,
        fulfilled: false,
        rejected: false
      };
  }
};