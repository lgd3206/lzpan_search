const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API路由 - 搜索
app.get('/api/search', async (req, res) => {
    try {
        const { q: query, page = 1, limit = 20 } = req.query;

        if (!query) {
            return res.status(400).json({ error: '缺少搜索关键词' });
        }

        // 模拟搜索结果
        const mockResults = generateMockResults(query, parseInt(page), parseInt(limit));
        
        res.json({
            success: true,
            query: query,
            total: 415,
            page: parseInt(page),
            limit: parseInt(limit),
            results: mockResults,
            searchTime: '90ms'
        });
    } catch (error) {
        console.error('搜索API错误:', error);
        res.status(500).json({ 
            success: false, 
            error: '搜索服务暂时不可用' 
        });
    }
});

// API路由 - 详情
app.get('/api/detail', async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: '缺少资源ID' });
        }

        const mockDetail = getMockDetail(id);
        
        if (!mockDetail) {
            return res.status(404).json({ error: '资源不存在' });
        }

        res.json({
            success: true,
            data: mockDetail
        });
    } catch (error) {
        console.error('详情API错误:', error);
        res.status(500).json({ 
            success: false, 
            error: '获取详情失败' 
        });
    }
});

// 页面路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/search.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

app.get('/detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'detail.html'));
});

app.get('/detail.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'detail.html'));
});

// 404处理
app.use((req, res) => {
    res.status(404).send(`
        <div style="text-align: center; padding: 50px; font-family: Arial;">
            <h1>404 - 页面未找到</h1>
            <p>您访问的页面不存在</p>
            <a href="/" style="color: #4285f4; text-decoration: none;">返回首页</a>
        </div>
    `);
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`🚀 资源搜服务器运行在端口 ${PORT}`);
    console.log(`🌐 访问地址: http://localhost:${PORT}`);
});

// ===== 模拟数据函数 =====

function generateMockResults(query, page, limit) {
    const mockData = [
        {
            id: 'result1',
            title: `${query}【2004 电视剧】`,
            description: `1d-vb.rmvb\nfile:${query}[国语23].d-vb.rmvb\nfile:${query}[国语02].d-vb.rmvb...`,
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
            description: `${query}[国语21].d-vb.rmvb\nfile:${query}[国语20].d-vb.rmvb\nfile:${query}[国语19].d-vb.rmvb...`,
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
            description: `包含多个版本的影视资源\nfolder:${query}1998版/\nfolder:${query}2011版/\nfolder:相关电影合集/`,
            tags: ['合集', '经典', '多版本'],
            source: '阿里云盘',
            size: '6.5GB',
            date: '2024-06-20',
            fileCount: 45,
            shareUrl: 'https://www.aliyundrive.com/s/abc123',
            extractCode: 'xyz9'
        },
        {
            id: 'result5',
            title: `${query} 4K重制版`,
            description: `超高清4K重制版本\nfile:${query}_4K_01.mkv\nfile:${query}_4K_02.mkv...`,
            tags: ['4K', '超清', '重制版'],
            source: '迅雷云盘',
            size: '15.2GB',
            date: '2024-12-01',
            fileCount: 8,
            shareUrl: 'https://pan.xunlei.com/s/abc123',
            extractCode: '4k89'
        }
    ];

    // 根据页码返回数据
    const startIndex = (page - 1) * limit;
    return mockData.slice(startIndex, startIndex + limit);
}

function getMockDetail(id) {
    const mockDetails = {
        result1: {
            id: 'result1',
            title: '水浒无间道【2004 电视剧】',
            shareUrl: 'https://pan.quark.cn/s/abc123def456',
            extractCode: '1234',
            source: '夸克网盘',
            totalSize: '2.1GB',
            fileCount: 23,
            updateDate: '2025-05-07',
            sharer: '老张*23年以前资源002',
            files: [
                { name: '水浒无间道01.rmvb', size: '425MB', type: 'video' },
                { name: '水浒无间道02.rmvb', size: '428MB', type: 'video' },
                { name: '水浒无间道03.rmvb', size: '430MB', type: 'video' },
                { name: '水浒无间道04.rmvb', size: '432MB', type: 'video' },
                { name: '水浒无间道05.rmvb', size: '429MB', type: 'video' },
                { name: '水浒无间道06.rmvb', size: '428MB', type: 'video' },
                { name: '水浒无间道07.rmvb', size: '430MB', type: 'video' },
                { name: '水浒无间道08.rmvb', size: '435MB', type: 'video' }
            ]
        },
        result2: {
            id: 'result2',
            title: '水浒无间道【2004 电视剧】完整版',
            shareUrl: 'https://pan.quark.cn/s/def456ghi789',
            extractCode: '5678',
            source: '夸克网盘',
            totalSize: '1.8GB',
            fileCount: 20,
            updateDate: '2024-11-09',
            sharer: '影视爱好者',
            files: [
                { name: '水浒无间道21.rmvb', size: '445MB', type: 'video' },
                { name: '水浒无间道22.rmvb', size: '440MB', type: 'video' },
                { name: '水浒无间道23.rmvb', size: '438MB', type: 'video' },
                { name: '水浒无间道24.rmvb', size: '442MB', type: 'video' }
            ]
        },
        result3: {
            id: 'result3',
            title: '无间道风云 (2006)',
            shareUrl: 'https://pan.baidu.com/s/1234567890',
            extractCode: 'abcd',
            source: '百度网盘',
            totalSize: '4.2GB',
            fileCount: 5,
            updateDate: '2024-08-15',
            sharer: '电影收藏家',
            files: [
                { name: '无间道风云[1080p].mp4', size: '3.2GB', type: 'video' },
                { name: '幕后花絮.mp4', size: '650MB', type: 'video' },
                { name: '导演访谈.mp4', size: '280MB', type: 'video' },
                { name: '删减片段.mp4', size: '120MB', type: 'video' }
            ]
        },
        result4: {
            id: 'result4',
            title: '水浒传合集【经典版本】',
            shareUrl: 'https://www.aliyundrive.com/s/abc123',
            extractCode: 'xyz9',
            source: '阿里云盘',
            totalSize: '6.5GB',
            fileCount: 45,
            updateDate: '2024-06-20',
            sharer: '经典影视收藏',
            files: [
                { name: '水浒传1998版/', size: '2.1GB', type: 'folder' },
                { name: '水浒传2011版/', size: '3.2GB', type: 'folder' },
                { name: '相关电影合集/', size: '1.2GB', type: 'folder' }
            ]
        },
        result5: {
            id: 'result5',
            title: '水浒无间道 4K重制版',
            shareUrl: 'https://pan.xunlei.com/s/abc123',
            extractCode: '4k89',
            source: '迅雷云盘',
            totalSize: '15.2GB',
            fileCount: 8,
            updateDate: '2024-12-01',
            sharer: '4K影视收藏家',
            files: [
                { name: '水浒无间道_4K_01.mkv', size: '2.1GB', type: 'video' },
                { name: '水浒无间道_4K_02.mkv', size: '2.0GB', type: 'video' },
                { name: '水浒无间道_4K_03.mkv', size: '1.9GB', type: 'video' },
                { name: '水浒无间道_4K_04.mkv', size: '2.2GB', type: 'video' }
            ]
        }
    };

    return mockDetails[id] || null;
}
