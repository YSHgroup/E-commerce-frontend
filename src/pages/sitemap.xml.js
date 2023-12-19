import api from '../lib/api';
import bannedIPs from '../data/bannedIPs';

const Sitemap = ({ xml }) => ( xml );

export async function getServerSideProps(context) {
    if (bannedIPs.includes(context.req.connection.remoteAddress)
            || bannedIPs.includes(context.req.headers['x-forwarded-for'])) {
        context.res.writeHead(403).end();
    }
    const { res } = context;

    const xml = await api()
        .get('/api/v1/sitemap')
        .then(response => response.data);

    res.setHeader('Cache-Control', `s-maxage=6, stale-while-revalidate`) ;
    res.setHeader('Content-Type', `text/xml`) ;
    
    res.write(xml);
    
    res.end();
}

export default Sitemap;
