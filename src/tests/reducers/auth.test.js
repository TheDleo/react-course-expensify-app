import authReducers from '../../reducers/auth';
import { ENETRESET } from 'constants';

test('should set up login state', () => {
    const uid = 'sadkjfhal ksdfh as';
    const action = {
        type: 'LOGIN',
        uid
    };
    const state = authReducers({}, action);
    expect(state).toEqual({uid});
});

test('should set up logout state', () => {
    const state = authReducers(
        { what: 'ever', totes: 'adorbs'},
        { type: 'LOGOUT'}
    );
    expect(state).toEqual({});
});

test('should not touch state if no match', () => {
    const currState = { what: 'ever', totes: 'adorbs'};
    const state = authReducers(
        currState,
        { type: 'BLAH'}
    );
    expect(state).toEqual(currState);
});