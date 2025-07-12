// 资源详情API
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: '缺少资源ID' });
    }

    try {
        const mockDetail = getMockDetail(id);
        
        if (!mockDetail) {
            return res.status(404).json({ error: '资源不存在' });
        }

        res.status(200).json({
            success: true,
            data: mockDetail
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: '获取详情失败' 
        });
    }
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
        }
    };

    return mockDetails[id] || null;
}
