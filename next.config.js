module.exports = {
    env: {
        PUBLIC_URL: '',
        PUBLIC_BASE_URL: 'https://3dinfinite.com',
        BASE_URL: 'https://api.3dinfinite.com',
            // BASE_URL: 'http://localhost:8000',
        IPINFO_TOKEN: '7f63140e8760eb', // TODO: this is Vitalii's private token I have created urgently, it should be changed to the company's token
        GOOGLE_ANALYTICS_ID: 'G-2BLS2KNPD8',
        STRIPE_PUBLIC_KEY:
            'pk_test_51HC5R9GlwrTIptENiWNhqcr3DiZA15bSLGidzRhtMIebMgRoP4WWzgFs1gmXV6vUuHgVjzZczq8SMz8liyHb5HYf00e7QwX2TB',
        generateBuildId: async () => {
            if (process.env.BUILD_ID) {
                return process.env.BUILD_ID;
            } else {
                return `${new Date().getTime()}`;
            }
        }
    }
};
