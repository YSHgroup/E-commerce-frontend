import packageIsBot from 'isbot';
import { fetchPrerenderedDataFromServer } from './api';

async function getPrerenderedData(context, duration) {
    if (context.req?.headers?.['user-agent']?.indexOf('puppeteer') > -1) {
        console.log('this is a puppeteer!', context.req.headers['user-agent']);
        return false;
    }
    console.log('url', context.req.url);
    console.log('not a puppeteer', context.req.headers['user-agent']);
    const params = {
        url: context.req.url,
        userAgent: context.req.headers['user-agent'],
        duration: duration,
    };

    return (await fetchPrerenderedDataFromServer(params)).content || false;
}

export const prerender = async (context, duration) => {
    console.log('main start');
    // default duration is two weeks
    duration = duration || 1000 * 60 * 60 * 24 * 14;
    
    let result;
    if (isbot(context)) {
        console.log('this is a bot');
        result = await getPrerenderedData(context, duration);
        console.log('after checkData');
    } else {
        console.log('this is NOT a bot');
        getPrerenderedData(context, duration);
        console.log('after checkData');
        result = false;
    }
    console.log('about to return result...', result);
    console.log('current time:', new Date().toTimeString());
    console.log('result string length: ', result ? result.length : 0);
    return result;
}

export const isbot = (context) => {
    // return true;
    return packageIsBot(context.req.headers['user-agent']);
}
