import Head from 'next/head';
import Link from 'next/link';
import "../static/css/calendar.less";

function IndexPage() {
    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css" />
                <title>Start</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            </Head>
            <h1>Hello Inbox Marketer 👋</h1>
            <Link href='/meeting'><a>Meeting Setup</a></Link>
        </div>
    )
}

export default IndexPage