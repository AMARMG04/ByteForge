/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            protocol: "https",
            hostname: "drive.google.com",
        }
        ]
    },
    output: 'export',
    typescript: {
        ignoreBuildErrors: true,
    }
};

module.exports = nextConfig
