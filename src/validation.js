export function validateSignUp(username, avatar) {
    if (!username || !avatar) {
        return 'Bad Request';
    }

    if (typeof username !== 'string' || typeof avatar !== 'string') {
        return 'Todos os campos são obrigatórios!';
    }

    return null; // Retorna null se a validação for bem-sucedida
}

export function validateTweet(username, tweet) {
    if (!username || !tweet) {
        return 'Bad Request';
    }

    if (typeof username !== 'string' || typeof tweet !== 'string') {
        return 'Todos os campos são obrigatórios!';
    }

    return null; // Retorna null se a validação for bem-sucedida
}
