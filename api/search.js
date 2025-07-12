// Railway 兼容的搜索API
export default async function handler(req, res) {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { q: query, page = 1, limit = 20 } = req.query;

    if (!query) {
        return res.status(400).json({ error: '缺少搜索关键词' });
    }

    try {
        // 模拟搜索结果
        const mockResults = generateMockResults(query, parseInt(page), parseInt(limit));
        
        res.status(200).json({
            success: true,
            query: query,
            total: 415,
            page: parseInt(page),
            limit: parseInt(limit),
            results: mockResults,
            searchTime: '90ms'
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: '搜索服务暂时不可用' 
        });
    }
}

function generateMockResults(query, page, limit) {
    const mockData = [
        {
            id: 'result1',
            title: `${query}【2004 电视剧】`,
            description: '1d-vb.rmvb\nfile:' + query + '[国语23].d-vb.rmvb\nfile:' + query + '[国语02].d-vb.rmvb...',
            tags: ['影视', '电视剧', '国语'],
            source: '夸克网盘',
            size: '2.1GB',
            date: '2025-03-12',
            fileCount: 23,
            shareUrl: 'https://pan.quark.cn/s/abc123def456',
            extractCode: '1234'
        },
        {
            id: 'result2',
            title: `${query}【2004 电视剧】完整版`,
            description: query + '[国语21].d-vb.rmvb\nfile:' + query + '[国语20].d-vb.rmvb\nfile:' + query + '[国语19].d-vb.rmvb...',
            tags: ['影视', '电视剧', '水浒传', '视频', '图片', 'Excel', '办公'],
            source: '夸克网盘',
            size: '1.8GB',
            date: '2024-11-09',
            fileCount: 20,
            shareUrl: 'https://pan.quark.cn/s/def456ghi789',
            extractCode: '5678'
        },
        {
            id: 'result3',
            title: `无间道风云 (2006)`,
            description: '高清重制版本，包含花絮和幕后制作特辑\nfile:无间道风云[1080p].mp4\nfile:幕后花絮.mp4...',
            tags: ['电影', '高清', '1080p', '花絮'],
            source: '百度网盘',
            size: '4.2GB',
            date: '2024-08-15',
            fileCount: 5,
            shareUrl: 'https://pan.baidu.com/s/1234567890',
            extractCode: 'abcd'
        },
        {
            id: 'result4',
            title: `${query}合集【经典版本】`,
            description: '包含多个版本的影视资源\nfolder:' + query + '1998版/\nfolder:' + query + '2011版/',
            tags: ['合集', '经典', '多版本'],
            source: '阿里云盘',
            size: '6.5GB',
            date: '2024-06-20',
            fileCount: 45,
            shareUrl: 'https://www.aliyundrive.com/s/abc123',
            extractCode: 'xyz9'
        }
    ];

    // 根据页码返回数据
    const startIndex = (page - 1) * limit;
    return mockData.slice(startIndex, startIndex + limit);
}
