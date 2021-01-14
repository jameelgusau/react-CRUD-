
import streams from '../apis/streams'
import history from '../history'
import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_STREAM, 
    FETCH_STREAM, 
    FETCH_STREAMS,
    DELETE_STREAM,
    EDIT_STREAM } from './types'

export const signIn =(userId)=>{
    return{
        type: SIGN_IN, 
        payload: userId
    }
}

export const signOut =()=>{
    return{
        type: SIGN_OUT
    }
}
export const createStream = formValue=> async (dispatch, getState) =>{
        const { userId} = getState().auth;
        const response = await streams.create('/streams', { ...formValue, userId })
        dispatch({type: CREATE_STREAM, payload: response})
        history.push('/')

    }

export const fetchStreams = ()=> async dispatch =>{
        const response = await streams.get('/streams')
        dispatch({type: FETCH_STREAMS, payload: response})
    }

export const fetchStream = id => async dispatch =>{
        const response = await streams.get(`/streams/${id}`)
        dispatch({type: FETCH_STREAM, payload: response})
    }

export const editStream = (id, formValue) => async dispatch =>{
        const response = await streams.patch(`/streams/${id}`, formValue)
        dispatch({type: EDIT_STREAM, payload: response})
        history.push('/')
    }

export const deleteStream = id => async dispatch =>{
        await streams.remove(`/streams/${id}`)
        dispatch({type: DELETE_STREAM, payload: id})
        history.push('/')
    }