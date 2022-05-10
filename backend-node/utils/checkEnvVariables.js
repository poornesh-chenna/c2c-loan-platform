export const checkEnvVariables = () => {
    let variables = ['JWT_SECRET']
    if (process.env.NODE_ENV !== 'production') {
        const devVariables = ['MONGO_URI_DEV']
        variables = [...variables, ...devVariables]
    } else {
        const productionVariables = ['MONGO_URI']
        variables = [...variables, ...productionVariables]
    }

    for (const variable of variables) {
        if (
            process.env[variable] === undefined ||
            process.env[variable] === '' ||
            process.env[variable] === null
        ) {
            console.log(`${variable} environmental variable is missing.`)
            process.exit()
        }
    }
}
