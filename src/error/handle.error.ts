import { ApolloError } from 'apollo-server-core';

const handleCastError = (error) => {
    const message = `Invalid ${error.path}: ${error.value}`;
    throw new ApolloError(message, 'GRAPHQL_VALIDATION_FAILED');
};

const handleValidationError = (error) => {
    const message = Object.values(error.errors).map((el) => el?.['message']);
    throw new ApolloError(
        `Invalid input: ${message.join(', ')}`,
        'GRAPHQL_VALIDATION_FAILED'
    );
};

export const handleError = (message: string, code: string) => {
    throw new ApolloError(
        message,
        code
    );
};

export const errorHandler = (err) => {
    if (err.name === 'CastError') handleCastError(err);
    if (err.name === 'ValidationError') handleValidationError(err);
    if (err.name === 'ForbiddenError') handleError(err.message, 'FORBIDDEN_ERROR');
    throw err;
};
