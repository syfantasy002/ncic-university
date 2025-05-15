// 校园图片生成脚本
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { createWriteStream } = require('fs');

// 创建图片文件夹
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
    console.log('创建images文件夹成功');
}

// 图片列表及其描述，为每张图片指定适合的风格和尺寸
const images = [
    // 通用图片 - Logo和Favicon
    {
        name: 'logo.png',
        prompt: 'Clean modern university logo for New Canaan International College. Simple elegant design with text NCIC and a symbolic book or globe element. Professional educational logo on transparent background.',
        style: 'vector_illustration/thin',
        width: 240,
        height: 80
    },
    {
        name: 'favicon.png',
        prompt: 'Minimal square icon version of New Canaan International College logo. Simple elegant design with NCIC initials or a symbolic book/globe element. Clean lines on transparent background.',
        style: 'vector_illustration/thin',
        width: 32,
        height: 32
    },
    
    // 首页图片
    {
        name: 'hero1.jpg',
        prompt: 'Modern university campus main building with impressive architecture. Beautiful landscaping and students walking around. Bright sunny day with blue sky.',
        style: 'realistic_image/natural_light',
        width: 1920,
        height: 900
    },
    {
        name: 'hero2.jpg',
        prompt: 'University classroom with engaged students and professor. Modern educational technology, bright well-designed learning space.',
        style: 'realistic_image/natural_light',
        width: 1920,
        height: 900
    },
    {
        name: 'hero3.jpg',
        prompt: 'University graduation ceremony with diverse happy graduates throwing caps in the air. Celebration atmosphere, outdoor campus setting.',
        style: 'realistic_image/natural_light',
        width: 1920,
        height: 900
    },
    {
        name: 'campus_main.jpg',
        prompt: 'Aerial view of a modern university campus with beautiful architecture, green spaces, and students walking around. Sunny day with blue sky. Perfect for a university homepage banner.',
        style: 'realistic_image/natural_light',
        width: 1920,
        height: 900
    },
    {
        name: 'students_diverse.jpg',
        prompt: 'Diverse group of international students studying together in a modern university library or collaborative space. Shows collaboration, different ethnicities, positive educational environment.',
        style: 'realistic_image/natural_light',
        width: 800,
        height: 500
    },
    {
        name: 'NCIC_building.jpg',
        prompt: 'Impressive main administration building of New Canaan International College. Modern educational architecture with distinctive design, glass and stone facade, main entrance with university name visible, beautiful landscaping in foreground.',
        style: 'realistic_image/natural_light',
        width: 1200,
        height: 800
    },
    {
        name: 'about_thumb.jpg',
        prompt: 'University campus quad with historic and modern buildings. Students walking and sitting on benches. Peaceful academic environment.',
        style: 'realistic_image/natural_light',
        width: 600,
        height: 400
    },
    {
        name: 'academics_thumb.jpg',
        prompt: 'Students in university laboratory doing scientific research. Modern equipment, engaged learning environment.',
        style: 'realistic_image/natural_light',
        width: 600,
        height: 400
    },
    {
        name: 'campus_thumb.jpg',
        prompt: 'Beautiful university campus with students socializing outdoors. Green space, modern buildings, vibrant student life.',
        style: 'realistic_image/natural_light',
        width: 600,
        height: 400
    },
    
    // 关于页面图片
    {
        name: 'about_banner.jpg',
        prompt: 'Panoramic view of university campus with distinctive architecture. Mountain backdrop, landscaped grounds, and flowing university life.',
        style: 'realistic_image/natural_light',
        width: 1920,
        height: 500
    },
    {
        name: 'president.jpg',
        prompt: 'Professional portrait of university president. Middle-aged man in formal business attire with friendly approachable expression. Office setting with bookshelf background.',
        style: 'realistic_image/studio_portrait',
        width: 400,
        height: 500
    },
    {
        name: 'vice_president.jpg',
        prompt: 'Professional portrait of a distinguished middle-aged woman in formal academic attire or business suit, looking confident and approachable. Office setting with academic credentials visible in the background. Vice President for Academic Affairs at university.',
        style: 'realistic_image/studio_portrait',
        width: 400,
        height: 500
    },
    {
        name: 'dean.jpg',
        prompt: 'Professional portrait of Dean of Students, middle-aged man or woman of diverse ethnicity wearing formal academic attire, looking welcoming and professional. Office background with student-focused decorations or awards.',
        style: 'realistic_image/studio_portrait',
        width: 400,
        height: 500
    },
    {
        name: 'campus_aerial.jpg',
        prompt: 'Aerial view of entire university campus showing layout of buildings, sports fields, and green spaces. Beautiful campus planning visible from above.',
        style: 'realistic_image/natural_light',
        width: 1200,
        height: 800
    },
    {
        name: 'history1.jpg',
        prompt: 'Historic photo of university founding in early days. Original campus building with vintage appearance, black and white or sepia toned.',
        style: 'realistic_image/faded_nostalgia',
        width: 600,
        height: 400
    },
    {
        name: 'history2.jpg',
        prompt: 'University campus development through mid-20th century. Growing campus with some new buildings, vintage color photo style.',
        style: 'realistic_image/faded_nostalgia',
        width: 600,
        height: 400
    },
    {
        name: 'history3.jpg',
        prompt: 'Modern university campus today with full development. Contemporary architecture, beautiful landscaping, vibrant student life.',
        style: 'realistic_image/natural_light',
        width: 600,
        height: 400
    },
    {
        name: 'accreditation1.jpg',
        prompt: 'Professional logo design for International Association of Universities (IAU) accreditation symbol. Educational, global, formal seal or emblem with blue and gold colors.',
        style: 'vector_illustration/thin',
        width: 300,
        height: 300
    },
    {
        name: 'accreditation2.jpg',
        prompt: 'Professional logo design for Association of Central Asian Universities (ACAU) accreditation symbol. Educational, regional, formal seal or emblem with red and gold colors.',
        style: 'vector_illustration/thin',
        width: 300,
        height: 300
    },
    {
        name: 'accreditation3.jpg',
        prompt: 'Professional logo design for Kyrgyz National Accreditation Council certification symbol. Educational, national, formal seal or emblem with green and gold colors.',
        style: 'vector_illustration/thin',
        width: 300,
        height: 300
    },
    {
        name: 'accreditation4.jpg',
        prompt: 'Professional logo design for European Quality Improvement System (EQUIS) business school accreditation symbol. Educational, professional, formal seal or emblem with blue and silver colors.',
        style: 'vector_illustration/thin',
        width: 300,
        height: 300
    },
    {
        name: 'state_of_art_facilities.jpg',
        prompt: 'Modern university state-of-the-art facilities. Showing advanced research laboratory, technology-enhanced classrooms, and innovative learning spaces. High-tech equipment, contemporary design, and students engaging with cutting-edge resources.',
        style: 'realistic_image/enterprise',
        width: 1200,
        height: 800
    },
    {
        name: 'student_testimonials.jpg',
        prompt: 'Diverse group of university students sharing their positive experiences in a panel discussion. Shows students of different ethnicities and backgrounds speaking about their university experience. Professional setting with university branding visible.',
        style: 'realistic_image/natural_light',
        width: 1200,
        height: 800
    },
    {
        name: 'distinguished_faculty.jpg',
        prompt: 'Group portrait of diverse university professors and faculty members in academic attire. Shows accomplished educators from various disciplines standing together in a prestigious university setting. Professional, dignified poses with academic buildings in background.',
        style: 'realistic_image/studio_portrait',
        width: 1200,
        height: 800
    },
    {
        name: 'academic_excellence.jpg',
        prompt: 'Students engaged in high-level academic work with professor guidance. Shows focused learning environment with achievements displayed, research activities, and scholarly atmosphere. University setting with symbols of academic achievement visible.',
        style: 'realistic_image/natural_light',
        width: 1200,
        height: 800
    },
    {
        name: 'about_NCIC.jpg',
        prompt: 'Panoramic view of New Canaan International College main campus. Shows beautiful modern university buildings, landscaped grounds, students walking between classes, and the university name visible on main building. Impressive academic atmosphere.',
        style: 'realistic_image/natural_light',
        width: 1600,
        height: 900
    },
    {
        name: 'global_connections.jpg',
        prompt: 'Visual representation of university\'s global network and international partnerships. World map with connection lines between New Canaan International College and partner institutions across continents. Diverse students collaborating in international exchange programs.',
        style: 'digital_illustration',
        width: 1200,
        height: 800
    },
    {
        name: 'research_innovation.jpg',
        prompt: 'University research lab with students and faculty working on innovative projects. Advanced scientific equipment, engaged researchers in white lab coats, and visible progress of cutting-edge research. Modern university research facility.',
        style: 'realistic_image/enterprise',
        width: 1200,
        height: 800
    },
    {
        name: 'community_engagement.jpg',
        prompt: 'University students and faculty participating in community service projects. Shows volunteers helping local community, engagement with diverse populations, and positive social impact activities. University members in branded shirts working on community initiatives.',
        style: 'realistic_image/natural_light',
        width: 1200,
        height: 800
    },
    {
        name: 'library.jpg',
        prompt: 'Modern university library interior with students studying. High ceilings, large windows, natural light, multiple floors of bookshelves, study areas with computers, and comfortable seating areas. State-of-the-art educational facility.',
        style: 'realistic_image/natural_light',
        width: 1920,
        height: 900
    },
    {
        name: 'college_building.jpg',
        prompt: 'Impressive university main building with modern architecture. Beautiful New Canaan International College main administration building with distinctive design, glass and stone facade, with university name visible on the entrance. Professional education establishment.',
        style: 'realistic_image/natural_light',
        width: 1200,
        height: 800
    },
    {
        name: 'student1.jpg',
        prompt: 'Portrait of a female university student in her early 20s, diverse ethnicity, smiling confidently at the camera. Natural lighting, blurred campus background, professional casual attire, testimonial style portrait.',
        style: 'realistic_image/studio_portrait',
        width: 400,
        height: 400
    },
    {
        name: 'student2.jpg',
        prompt: 'Portrait of a male university student in his early 20s, diverse ethnicity, smiling confidently at the camera. Natural lighting, blurred campus background, professional casual attire, testimonial style portrait.',
        style: 'realistic_image/studio_portrait',
        width: 400,
        height: 400
    },
    {
        name: 'academics_main.jpg',
        prompt: 'University academic setting with professor and engaged students in a modern classroom. High-quality educational environment with technology integration, interactive learning, and academic excellence visible.',
        style: 'realistic_image/natural_light',
        width: 1200,
        height: 800
    },
    {
        name: 'faculty1.jpg',
        prompt: 'Professional portrait of university professor, middle-aged man with glasses in formal academic attire. Confident and approachable expression, office or classroom environment with academic books and materials in background.',
        style: 'realistic_image/studio_portrait',
        width: 400,
        height: 500
    },
    {
        name: 'faculty2.jpg',
        prompt: 'Professional portrait of university professor, woman in her 40s in formal academic attire. Intelligent and welcoming expression, research laboratory or office setting with scientific equipment or academic credentials visible in background.',
        style: 'realistic_image/studio_portrait',
        width: 400,
        height: 500
    },
    {
        name: 'faculty3.jpg',
        prompt: 'Professional portrait of university professor, man or woman of diverse ethnicity in formal academic attire. Professional and engaging expression, modern classroom or campus setting with educational technology visible in background.',
        style: 'realistic_image/studio_portrait',
        width: 400,
        height: 500
    },
    
    // 学术页面图片
    {
        name: 'academics_banner.jpg',
        prompt: 'University library interior with students studying. Modern academic environment with books, computers, and collaborative spaces.',
        style: 'realistic_image/natural_light',
        width: 1920,
        height: 500
    },
    {
        name: 'business_school.jpg',
        prompt: 'Business school building with modern corporate architecture. Professional atmosphere, students in business attire entering building.',
        style: 'realistic_image/enterprise',
        width: 800,
        height: 500
    },
    {
        name: 'engineering_school.jpg',
        prompt: 'Engineering laboratory with students working on technical projects. Modern equipment, robotics, computers, hands-on learning environment.',
        style: 'realistic_image/enterprise',
        width: 800,
        height: 500
    },
    {
        name: 'arts_school.jpg',
        prompt: 'Fine arts studio at university with students creating artwork. Bright creative space with paintings, sculptures, and artistic atmosphere.',
        style: 'realistic_image/natural_light',
        width: 800,
        height: 500
    },
    {
        name: 'science_school.jpg',
        prompt: 'Science laboratory with students conducting experiments. Modern scientific equipment, chemistry or biology setting, engaged learning.',
        style: 'realistic_image/enterprise',
        width: 800,
        height: 500
    },
    {
        name: 'humanities_school.jpg',
        prompt: 'Humanities classroom with engaging professor and students in discussion. Book-lined room, intellectual atmosphere, seminar setting.',
        style: 'realistic_image/natural_light',
        width: 800,
        height: 500
    },
    
    // 招生页面图片
    {
        name: 'admission_banner.jpg',
        prompt: 'New students on enrollment day at university campus. Diverse group of excited students starting their academic journey, orientation atmosphere.',
        style: 'realistic_image/natural_light',
        width: 1920,
        height: 500
    },
    {
        name: 'apply_steps.jpg',
        prompt: 'Student completing university application at computer. Focused young person working on online application form, determined expression.',
        style: 'realistic_image/natural_light',
        width: 800,
        height: 500
    },
    {
        name: 'financial_aid.jpg',
        prompt: 'Students meeting with financial advisor in university office. Professional consultation about scholarships and financial aid options.',
        style: 'realistic_image/natural_light',
        width: 800,
        height: 500
    },
    {
        name: 'international_students.jpg',
        prompt: 'Diverse group of international students on university campus. Multiple ethnicities represented, socializing and studying together.',
        style: 'realistic_image/natural_light',
        width: 800,
        height: 500
    },
    {
        name: 'virtual_tour.jpg',
        prompt: 'Virtual campus tour interface showing university building. Computer or tablet screen with interactive 3D campus map and navigation controls.',
        style: 'digital_illustration',
        width: 800,
        height: 500
    },
    
    // 校园生活页面图片
    {
        name: 'campus_banner.jpg',
        prompt: 'Vibrant university campus scene with students engaged in various activities. Shows the quad area with people studying, socializing, and relaxing. Beautiful landscaping and modern buildings in background.',
        style: 'realistic_image/natural_light',
        width: 1920,
        height: 500
    },
    {
        name: 'campus_life_main.jpg',
        prompt: 'Students participating in a campus festival or outdoor event. Shows diverse student body enjoying activities, food, music, and socializing. Colorful decorations and festive atmosphere.',
        style: 'realistic_image/real_life_glow',
        width: 800,
        height: 500
    },
    {
        name: 'dorm1.jpg',
        prompt: 'Modern university dormitory room designed for two students. Clean, well-lit space with beds, desks, storage, and technology amenities. Comfortable and functional design.',
        style: 'realistic_image/natural_light',
        width: 600,
        height: 400
    },
    {
        name: 'dorm2.jpg',
        prompt: 'Common area in student residence hall with comfortable seating, study space, and social areas. Students studying and socializing in a modern, well-designed space.',
        style: 'realistic_image/natural_light',
        width: 600,
        height: 400
    },
    {
        name: 'dorm3.jpg',
        prompt: 'Exterior view of modern student residence buildings on campus. Contemporary architecture with landscaped surroundings and outdoor gathering spaces.',
        style: 'realistic_image/evening_light',
        width: 600,
        height: 400
    },
    {
        name: 'dining1.jpg',
        prompt: 'Modern university dining hall interior with students enjoying meals. Bright, spacious area with diverse food stations and comfortable seating arrangements.',
        style: 'realistic_image/natural_light',
        width: 600,
        height: 400
    },
    {
        name: 'dining2.jpg',
        prompt: 'Students enjoying healthy meal options in a university cafeteria. Fresh salad bar and nutritious food choices in an inviting dining environment.',
        style: 'realistic_image/natural_light',
        width: 600,
        height: 400
    },
    {
        name: 'dining3.jpg',
        prompt: 'International cuisine section of a university dining hall. Various global food options with students from diverse backgrounds enjoying meals together.',
        style: 'realistic_image/natural_light',
        width: 600,
        height: 400
    },
    {
        name: 'dining_central.jpg',
        prompt: 'Main dining hall of a university campus. Spacious, modern interior with multiple food stations, seating areas, and students enjoying meals.',
        style: 'realistic_image/natural_light',
        width: 600,
        height: 400
    },
    {
        name: 'dining_global.jpg',
        prompt: 'Global fusion restaurant on university campus. International cuisine with modern decor and students enjoying diverse meals.',
        style: 'realistic_image/warm_folk',
        width: 600,
        height: 400
    },
    {
        name: 'dining_cafe.jpg',
        prompt: 'Cozy campus cafe with students studying and socializing. Coffee bar, comfortable seating, and relaxed atmosphere in a university library setting.',
        style: 'realistic_image/faded_nostalgia',
        width: 600,
        height: 400
    },
    {
        name: 'dining_express.jpg',
        prompt: 'Campus express market with grab-and-go food options. Convenience store style setting with students purchasing quick meals and snacks.',
        style: 'realistic_image',
        width: 600,
        height: 400
    },
    {
        name: 'activity1.jpg',
        prompt: 'International cultural festival on university campus. Students in traditional attire showcasing cultural performances, food, and displays.',
        style: 'realistic_image/warm_folk',
        width: 600,
        height: 400
    },
    {
        name: 'activity2.jpg',
        prompt: 'University debate club in action. Students engaged in formal debate in a classroom or auditorium setting with audience.',
        style: 'realistic_image/enterprise',
        width: 600,
        height: 400
    },
    {
        name: 'activity3.jpg',
        prompt: 'University students engaged in community volunteer work. Group of diverse students helping at a local community project or charity event.',
        style: 'realistic_image/urban_drama',
        width: 600,
        height: 400
    },
    {
        name: 'activity4.jpg',
        prompt: 'Student music performance on university campus. Band or orchestra performing at a campus venue with audience of students.',
        style: 'realistic_image/evening_light',
        width: 600,
        height: 400
    },
    {
        name: 'sports_facilities.jpg',
        prompt: 'Modern university sports center. Well-equipped gymnasium with fitness equipment, courts, and students exercising.',
        style: 'realistic_image/enterprise',
        width: 800,
        height: 500
    },
    {
        name: 'health_center.jpg',
        prompt: 'University health center reception area. Modern, welcoming medical facility on campus with staff and students.',
        style: 'realistic_image/natural_light',
        width: 800,
        height: 500
    },
    {
        name: 'culture_event1.jpg',
        prompt: 'Annual international festival on university campus. Colorful displays, performances, and students from diverse backgrounds sharing cultural traditions.',
        style: 'realistic_image/warm_folk',
        width: 600,
        height: 400
    },
    {
        name: 'culture_event2.jpg',
        prompt: 'University arts week exhibition. Student artwork on display in a gallery setting with visitors viewing the pieces.',
        style: 'realistic_image',
        width: 600,
        height: 400
    },
    {
        name: 'culture_event3.jpg',
        prompt: 'University leadership summit or conference. Professional setting with speakers, panel discussions, and student audience.',
        style: 'realistic_image/enterprise',
        width: 600,
        height: 400
    },
    {
        name: 'student_voice1.jpg',
        prompt: 'Portrait of an Asian male university student in casual attire smiling at camera. Professional headshot style against neutral background.',
        style: 'realistic_image/studio_portrait',
        width: 200,
        height: 200
    },
    {
        name: 'student_voice2.jpg',
        prompt: 'Portrait of a female Caucasian university student in business casual attire. Professional headshot style against neutral background.',
        style: 'realistic_image/studio_portrait',
        width: 200,
        height: 200
    },
    {
        name: 'student_voice3.jpg',
        prompt: 'Portrait of a Middle Eastern male graduate student in smart casual attire. Professional headshot style against neutral background.',
        style: 'realistic_image/studio_portrait',
        width: 200,
        height: 200
    },
    
    // 联系页面图片
    {
        name: 'contact_banner.jpg',
        prompt: 'University administration building with modern architecture. Impressive entrance, professional setting, where student services are located.',
        style: 'realistic_image/natural_light',
        width: 1920,
        height: 500
    },
    {
        name: 'campus_map.jpg',
        prompt: 'Illustrated map of university campus showing buildings, pathways, and landmarks. Top-down stylized view with labels and legend.',
        style: 'digital_illustration',
        width: 1200,
        height: 900
    },
    {
        name: 'contact_office.jpg',
        prompt: 'University admissions office with staff helping students. Welcoming environment, professional setting, customer service area.',
        style: 'realistic_image/natural_light',
        width: 800,
        height: 500
    },
    
    // 招生页面新增图片
    {
        name: 'admission_welcome.jpg',
        prompt: 'University admissions office with friendly staff welcoming prospective students. Bright modern space with NCIC branding, informational materials, and professional atmosphere.',
        style: 'realistic_image/natural_light',
        width: 800,
        height: 500
    },
    {
        name: 'scholarship_medal.jpg',
        prompt: 'Academic scholarship medal or certificate with university seal. Elegant design representing academic achievement and excellence.',
        style: 'realistic_image/studio_portrait',
        width: 400,
        height: 300
    }
];

// 配置信息
const config = {
    apiKey: '8aa52af4-837b-43bc-bea6-50fd89b97dba:87482d30990d0b7567249088a382c0ba',
    proxy: {
        host: '127.0.0.1',
        port: 7897
    },
    apiUrl: 'queue.fal.run',
    apiPath: '/fal-ai/recraft/v3/text-to-image',
    retryLimit: 3,
    retryDelay: 2000,
    pollingInterval: 3000, // 轮询间隔（毫秒）
    pollingTimeout: 90000  // 轮询超时（毫秒）
};

// 统计信息
const stats = {
    total: images.length,
    success: 0,
    failed: 0,
    completed: 0,
    skipped: 0,  // 新增：已跳过的图片数量
    startTime: null,
    // 记录哪些图片生成失败了
    failedImages: []
};

// 是否已经运行完成
let isCompleted = false;

// 处理 Ctrl+C 退出
process.on('SIGINT', () => {
    console.log('\n\n中断执行！正在生成统计报告...');
    
    if (!isCompleted) {
        printFinalStats();
    }
    
    process.exit(0);
});

// 处理未捕获的异常
process.on('uncaughtException', (err) => {
    console.error('\n发生未捕获的异常:', err);
    
    if (!isCompleted) {
        printFinalStats();
    }
    
    process.exit(1);
});

// 通过代理发送请求
function sendRequestThroughProxy(options, postData) {
    return new Promise((resolve, reject) => {
        const proxyReq = http.request({
            host: config.proxy.host,
            port: config.proxy.port,
            method: 'CONNECT',
            path: `${options.hostname}:443`
        });

        proxyReq.on('connect', (proxyRes, socket, head) => {
            const req = https.request({
                ...options,
                socket: socket,
                agent: false
            }, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    try {
                        const responseData = JSON.parse(data);
                        resolve({ statusCode: res.statusCode, data: responseData });
                    } catch (e) {
                        reject(new Error(`响应解析失败: ${e.message}, 原始数据: ${data}`));
                    }
                });
            });

            req.on('error', (err) => {
                reject(err);
            });

            if (postData) {
                req.write(postData);
            }
            req.end();
        });

        proxyReq.on('error', (err) => {
            reject(err);
        });

        proxyReq.end();
    });
}

// 下载图片
function downloadImage(url, outputPath) {
    return new Promise((resolve, reject) => {
        // 解析URL
        const urlObj = new URL(url);
        
        // 通过代理发送下载请求
        const proxyReq = http.request({
            host: config.proxy.host,
            port: config.proxy.port,
            method: 'CONNECT',
            path: `${urlObj.hostname}:443`
        });

        proxyReq.on('connect', (proxyRes, socket, head) => {
            const options = {
                hostname: urlObj.hostname,
                path: urlObj.pathname + urlObj.search,
                method: 'GET',
                socket: socket,
                agent: false
            };

            const req = https.request(options, (res) => {
                if (res.statusCode !== 200) {
                    reject(new Error(`下载失败，HTTP状态码: ${res.statusCode}`));
                    return;
                }
                
                const file = createWriteStream(outputPath);
                res.pipe(file);
                
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
                
                file.on('error', (err) => {
                    fs.unlinkSync(outputPath);
                    reject(err);
                });
            });

            req.on('error', (err) => {
                reject(err);
            });
            
            req.end();
        });

        proxyReq.on('error', (err) => {
            reject(new Error(`代理连接失败: ${err.message}`));
        });

        proxyReq.end();
    });
}

// 获取请求状态
async function getRequestStatus(requestId) {
    const options = {
        hostname: config.apiUrl,
        path: `/fal-ai/recraft/requests/${requestId}/status`,
        method: 'GET',
        headers: {
            'Authorization': `Key ${config.apiKey}`
        }
    };
    
    const response = await sendRequestThroughProxy(options);
    return response.data;
}

// 获取请求结果
async function getRequestResult(requestId) {
    const options = {
        hostname: config.apiUrl,
        path: `/fal-ai/recraft/requests/${requestId}`,
        method: 'GET',
        headers: {
            'Authorization': `Key ${config.apiKey}`
        }
    };
    
    const response = await sendRequestThroughProxy(options);
    return response.data;
}

// 等待请求完成
async function waitForRequestCompletion(requestId) {
    const startTime = Date.now();
    
    while (true) {
        // 检查是否超时
        if (Date.now() - startTime > config.pollingTimeout) {
            throw new Error(`等待请求完成超时，请求ID: ${requestId}`);
        }
        
        try {
            const statusResponse = await getRequestStatus(requestId);
            
            if (statusResponse.status === 'COMPLETED') {
                return await getRequestResult(requestId);
            } else if (statusResponse.status === 'FAILED') {
                throw new Error(`请求处理失败: ${statusResponse.error || '未知错误'}`);
            }
            
            // 等待一段时间后再次检查
            await new Promise(resolve => setTimeout(resolve, config.pollingInterval));
        } catch (error) {
            throw error;
        }
    }
}

// 获取时间差的格式化字符串
function getTimeDiff(startTime) {
    const diff = Date.now() - startTime;
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// 打印统计信息
function printStats() {
    const timeDiff = getTimeDiff(stats.startTime);
    const remainingImages = stats.total - stats.completed;
    const estimatedSecondsLeft = remainingImages * 15; // 假设每张图片平均处理时间为15秒
    
    const estimatedMins = Math.floor(estimatedSecondsLeft / 60);
    const estimatedSecs = estimatedSecondsLeft % 60;
    
    console.log(`\n--- 当前进度统计 ---`);
    console.log(`运行时间: ${timeDiff}`);
    console.log(`完成情况: ${stats.completed}/${stats.total} (${Math.floor((stats.completed/stats.total)*100)}%)`);
    console.log(`成功: ${stats.success}, 失败: ${stats.failed}`);
    console.log(`预计剩余时间: 约${estimatedMins}分${estimatedSecs}秒`);
    console.log(`-------------------\n`);
}

// 打印最终统计信息
function printFinalStats() {
    const timeDiff = getTimeDiff(stats.startTime);
    
    console.log(`\n========= 最终统计 =========`);
    console.log(`总运行时间: ${timeDiff}`);
    console.log(`总图片数: ${images.length}`);
    console.log(`已跳过图片: ${images.length - stats.total}`);  // 新增：显示跳过的图片数量
    console.log(`待生成图片: ${stats.total}`);
    console.log(`成功生成: ${stats.success}`);
    console.log(`失败数量: ${stats.failed}`);
    if (stats.total > 0) {
        console.log(`成功率: ${Math.floor((stats.success/stats.total)*100)}%`);
    }
    
    if (stats.failed > 0) {
        console.log(`\n以下图片生成失败:`);
        stats.failedImages.forEach((img, index) => {
            console.log(`${index+1}. ${img}`);
        });
        console.log(`\n可以修改脚本仅重试这些失败的图片`);
    }
    
    console.log(`============================\n`);
}

// 重试函数
async function retryOperation(operation, maxRetries, delay, ...args) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation(...args);
        } catch (err) {
            lastError = err;
            console.log(`尝试 ${attempt}/${maxRetries} 失败: ${err.message}`);
            
            if (attempt < maxRetries) {
                console.log(`等待 ${delay/1000} 秒后重试...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw lastError;
}

// 生成并下载图片
async function generateAndDownloadImages() {
    console.log(`开始检查 ${images.length} 张图片，使用代理: ${config.proxy.host}:${config.proxy.port}`);
    stats.startTime = Date.now();
    
    // 检查哪些图片已经存在
    const existingImages = fs.readdirSync(imagesDir);
    const pendingImages = images.filter(img => !existingImages.includes(img.name));
    
    console.log(`发现 ${existingImages.length} 个已存在的图片文件`);
    console.log(`需要生成 ${pendingImages.length} 个新图片`);
    
    if (pendingImages.length === 0) {
        console.log('所有图片已存在，无需生成');
        isCompleted = true;
        return;
    }
    
    // 设置统计信息
    stats.total = pendingImages.length;
    
    // 依次处理每张图片
    for (const img of pendingImages) {
        try {
            console.log(`\n[${stats.completed+1}/${stats.total}] 正在生成: ${img.name}`);
            console.log(`使用风格: ${img.style}`);
            
            if (img.width && img.height) {
                console.log(`图片尺寸: ${img.width}x${img.height}`);
            }
            
            // 准备请求数据，根据文档格式
            const requestData = JSON.stringify({
                prompt: img.prompt,
                style: img.style || 'realistic_image',
                image_size: img.width && img.height ? {
                    width: img.width,
                    height: img.height
                } : "square_hd"  // 使用指定尺寸或默认高质量方形图片
            });
            
            // 设置请求选项
            const options = {
                hostname: config.apiUrl,
                path: config.apiPath,
                method: 'POST',
                headers: {
                    'Authorization': `Key ${config.apiKey}`,
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(requestData)
                }
            };
            
            // 发送请求并获取响应（带重试机制）
            const response = await retryOperation(
                sendRequestThroughProxy,
                config.retryLimit,
                config.retryDelay,
                options,
                requestData
            );
            
            // 检查是否有请求ID
            if (!response.data.request_id) {
                throw new Error('未能获取请求ID，API响应: ' + JSON.stringify(response.data));
            }
            
            const requestId = response.data.request_id;
            console.log(`已提交请求，ID: ${requestId}，等待处理...`);
            
            // 等待请求完成
            const result = await retryOperation(
                waitForRequestCompletion,
                1, // 这里不需要太多重试，因为轮询本身就是一种重试机制
                0,
                requestId
            );
            
            // 检查结果是否含有图片
            if (result.images && result.images.length > 0) {
                const imageUrl = result.images[0].url;
                const outputPath = path.join(imagesDir, img.name);
                
                console.log(`图片生成成功，正在下载: ${imageUrl}`);
                
                // 下载图片（带重试机制）
                await retryOperation(
                    downloadImage,
                    config.retryLimit,
                    config.retryDelay,
                    imageUrl,
                    outputPath
                );
                
                console.log(`✓ 成功下载: ${img.name}`);
                stats.success++;
            } else {
                throw new Error('未能获取图片URL，API响应: ' + JSON.stringify(result));
            }
        } catch (error) {
            console.error(`✗ 生成错误 ${img.name}: ${error.message}`);
            stats.failed++;
            stats.failedImages.push(img.name);
        }
        
        // 更新进度
        stats.completed++;
        const progressPercent = Math.floor((stats.completed / stats.total) * 100);
        const progressBar = '[' + '='.repeat(Math.floor(progressPercent / 5)) + ' '.repeat(20 - Math.floor(progressPercent / 5)) + ']';
        console.log(`${progressBar} ${progressPercent}% (${stats.completed}/${stats.total})`);
        
        // 每3张图片显示一次统计信息
        if (stats.completed % 3 === 0 || stats.completed === stats.total) {
            printStats();
        }
        
        // 等待两秒，避免API限制
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    isCompleted = true;
    console.log(`\n✓ 图片生成完成，总共 ${pendingImages.length} 张图片，${stats.success} 张成功，${stats.failed} 张失败`);
    printFinalStats();
}

// 执行图片生成
generateAndDownloadImages().catch(err => {
    console.error('图片生成过程中发生错误:', err);
    printFinalStats();
}); 