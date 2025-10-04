// 设备检测
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /iPad|Android|Tablet/i.test(navigator.userAgent);
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// 根据设备类型添加样式类
if (isTouchDevice) {
    document.body.classList.add('touch-device');
}
if (isMobile) {
    document.body.classList.add('mobile-device');
}
if (isTablet) {
    document.body.classList.add('tablet-device');
}

// 平滑滚动导航
const navLinks = document.querySelectorAll('.nav-link a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 导航栏滚动效果
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 向下滚动
        header.style.transform = 'translateY(-100%)';
    } else {
        // 向上滚动
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// 服务器地址复制功能
function copyServerAddress() {
    const serverAddress = 'gm.rainplay.cn:32772';
    
    // 尝试使用现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(serverAddress)
            .then(() => {
                showCopyFeedback('服务器地址已复制到剪贴板！');
            })
            .catch(() => {
                fallbackCopy(serverAddress);
            });
    } else {
        // 使用传统方法
        fallbackCopy(serverAddress);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyFeedback('服务器地址已复制到剪贴板！');
    } catch (err) {
        showCopyFeedback('复制失败，请手动复制地址');
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback(message) {
    // 创建反馈元素
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(feedback);
    
    // 3秒后移除
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

// 卡片悬停效果（仅在非触摸设备上生效）
if (!isTouchDevice) {
    const cards = document.querySelectorAll('.mod-card, .shader-card, .texture-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 12px 32px rgba(76, 175, 80, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        });
    });
}

// 按钮点击效果
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // 添加点击反馈
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

// 响应式调整
function handleResize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 窗口调整事件（防抖处理）
window.addEventListener('resize', debounce(handleResize, 250));

// 页面加载完成后的初始化
window.addEventListener('DOMContentLoaded', () => {
    handleResize();
    
    // 添加加载完成动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 为服务器地址添加点击效果
    const serverAddress = document.querySelector('.server-address');
    if (serverAddress) {
        serverAddress.addEventListener('click', copyServerAddress);
        
        // 添加悬停效果
        if (!isTouchDevice) {
            serverAddress.addEventListener('mouseenter', () => {
                serverAddress.style.transform = 'scale(1.05)';
                serverAddress.style.boxShadow = '0 8px 24px rgba(76, 175, 80, 0.3)';
            });
            
            serverAddress.addEventListener('mouseleave', () => {
                serverAddress.style.transform = 'scale(1)';
                serverAddress.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
            });
        }
    }
});

// 添加CSS动画定义
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);