import React from 'react'
import { Mutation } from 'react-apollo'
import { likePostMutation } from '../GQL/mutation';

const LikePostComponent = () => {
    return (
    <Mutation mutation={likePostMutation}>
    </Mutation>
)}