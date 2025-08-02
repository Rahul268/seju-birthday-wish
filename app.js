// Interactive Birthday Page for Seju
class BirthdayPage {
    constructor() {
        this.confettiContainer = document.querySelector('.confetti-container');
        this.cake = document.getElementById('birthdayCake');
        this.cuttingLine = document.getElementById('cuttingLine');
        this.sparklesContainer = document.getElementById('sparklesContainer');
        this.crumbsContainer = document.getElementById('crumbsContainer');
        this.cutMessage = document.getElementById('cutMessage');
        this.candles = document.querySelectorAll('.candle');
        this.balloons = document.querySelectorAll('.balloon');
        
        this.isCakeCut = false;
        this.candlesBlown = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.startInitialConfetti();
        this.startFloatingHearts();
    }

    bindEvents() {
        // Cake cutting
        document.getElementById('cutCakeBtn').addEventListener('click', () => {
            this.cutCake();
        });

        // Candle blowing
        document.getElementById('blowCandlesBtn').addEventListener('click', () => {
            this.blowCandles();
        });

        // Make a wish button
        document.getElementById('makeWishBtn').addEventListener('click', () => {
            this.makeWish();
        });

        // Balloon popping
        this.balloons.forEach(balloon => {
            balloon.addEventListener('click', (e) => {
                this.popBalloon(e.target);
            });
        });

        // Individual candle clicking
        this.candles.forEach(candle => {
            candle.addEventListener('click', (e) => {
                this.blowSingleCandle(e.currentTarget);
            });
        });

        // Touch feedback for mobile
        this.addTouchFeedback();
    }

    // Initial confetti burst on page load
    startInitialConfetti() {
        setTimeout(() => {
            this.createConfetti(50);
        }, 500);
    }

    // Continuous floating hearts
    startFloatingHearts() {
        // Hearts are handled by CSS animation, but we can add more dynamically
        setInterval(() => {
            this.addRandomHeart();
        }, 3000);
    }

    addRandomHeart() {
        const heartsContainer = document.querySelector('.floating-hearts-container');
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['❤️', '💕', '💖', '💝', '💗'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (1.2 + Math.random() * 0.8) + 'rem';
        heart.style.animationDelay = '0s';
        
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 8000);
    }

    // Cake cutting animation
    cutCake() {
        if (this.isCakeCut) return;
        
        const cutBtn = document.getElementById('cutCakeBtn');
        cutBtn.disabled = true;
        cutBtn.textContent = '✨ Cutting... ✨';
        
        // Show cutting line
        this.cuttingLine.classList.add('active');
        
        // Add sparkle effects
        setTimeout(() => {
            this.createSparkles();
        }, 500);
        
        // Split the cake
        setTimeout(() => {
            this.cake.classList.add('cut');
            this.createCrumbs();
        }, 1000);
        
        // Show success message and confetti
        setTimeout(() => {
            // Make sure to show the cut message
            if (this.cutMessage) {
                this.cutMessage.classList.remove('hidden');
                this.cutMessage.style.display = 'block';
            }
            this.createConfetti(30);
            cutBtn.textContent = '🎂 Cake Cut! 🎂';
        }, 2000);
        
        // Visual "SLICE!" effect
        setTimeout(() => {
            this.showSliceEffect();
        }, 1200);
        
        this.isCakeCut = true;
    }

    createSparkles() {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.animationDelay = (i * 0.1) + 's';
            sparkle.style.transform = `rotate(${i * 45}deg)`;
            this.sparklesContainer.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }
    }

    createCrumbs() {
        for (let i = 0; i < 12; i++) {
            const crumb = document.createElement('div');
            crumb.className = 'crumb';
            crumb.style.left = (Math.random() * 100) + '%';
            crumb.style.animationDelay = (Math.random() * 0.5) + 's';
            crumb.style.backgroundColor = ['#8B4513', '#A0522D', '#CD853F'][Math.floor(Math.random() * 3)];
            this.crumbsContainer.appendChild(crumb);
            
            setTimeout(() => {
                if (crumb.parentNode) {
                    crumb.parentNode.removeChild(crumb);
                }
            }, 2000);
        }
    }

    showSliceEffect() {
        const sliceText = document.createElement('div');
        sliceText.textContent = 'SLICE! ✨';
        sliceText.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--color-primary);
            z-index: 20;
            animation: fadeInOut 1s ease-out forwards;
        `;
        
        // Add fadeInOut animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        this.cake.appendChild(sliceText);
        
        setTimeout(() => {
            if (sliceText.parentNode) {
                sliceText.parentNode.removeChild(sliceText);
            }
        }, 1000);
    }

    // Blow all candles
    blowCandles() {
        if (this.candlesBlown) return;
        
        const blowBtn = document.getElementById('blowCandlesBtn');
        blowBtn.disabled = true;
        blowBtn.textContent = '💨 Blowing... 💨';
        
        // Force blow each candle with proper timing
        this.candles.forEach((candle, index) => {
            setTimeout(() => {
                const flame = candle.querySelector('.flame');
                if (flame && !flame.classList.contains('blown-out')) {
                    flame.classList.add('blown-out');
                    flame.style.opacity = '0';
                    flame.style.transform = 'scale(0)';
                    this.createSmoke(candle);
                }
            }, index * 200);
        });
        
        setTimeout(() => {
            blowBtn.textContent = '🎉 Candles Blown! 🎉';
            this.createConfetti(25);
        }, this.candles.length * 200 + 500);
        
        this.candlesBlown = true;
    }

    // Blow individual candle
    blowSingleCandle(candle) {
        const flame = candle.querySelector('.flame');
        if (flame && !flame.classList.contains('blown-out')) {
            flame.classList.add('blown-out');
            flame.style.opacity = '0';
            flame.style.transform = 'scale(0)';
            
            // Add smoke effect
            this.createSmoke(candle);
        }
    }

    createSmoke(candle) {
        const smoke = document.createElement('div');
        smoke.textContent = '💨';
        smoke.style.cssText = `
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
            opacity: 0.7;
            animation: smokeRise 2s ease-out forwards;
        `;
        
        const smokeAnimation = `
            @keyframes smokeRise {
                0% { opacity: 0.7; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-30px); }
            }
        `;
        
        if (!document.querySelector('#smoke-style')) {
            const style = document.createElement('style');
            style.id = 'smoke-style';
            style.textContent = smokeAnimation;
            document.head.appendChild(style);
        }
        
        candle.appendChild(smoke);
        
        setTimeout(() => {
            if (smoke.parentNode) {
                smoke.parentNode.removeChild(smoke);
            }
        }, 2000);
    }

    // Make a wish with extra confetti
    makeWish() {
        const wishBtn = document.getElementById('makeWishBtn');
        const originalText = wishBtn.textContent;
        
        wishBtn.disabled = true;
        wishBtn.textContent = '✨ Making Wish... ✨';
        
        // Create extra special confetti
        this.createConfetti(80);
        
        // Add wish sparkles around the button
        this.createWishSparkles(wishBtn);
        
        setTimeout(() => {
            wishBtn.textContent = '🌟 Wish Made! 🌟';
            setTimeout(() => {
                wishBtn.disabled = false;
                wishBtn.textContent = originalText;
            }, 2000);
        }, 1500);
    }

    createWishSparkles(element) {
        const rect = element.getBoundingClientRect();
        const container = document.body;
        
        for (let i = 0; i < 12; i++) {
            const sparkle = document.createElement('div');
            sparkle.textContent = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                font-size: 1rem;
                pointer-events: none;
                z-index: 1000;
                animation: wishSparkle 2s ease-out forwards;
                animation-delay: ${i * 0.1}s;
            `;
            
            container.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }
        
        // Add wish sparkle animation if not exists
        if (!document.querySelector('#wish-sparkle-style')) {
            const style = document.createElement('style');
            style.id = 'wish-sparkle-style';
            style.textContent = `
                @keyframes wishSparkle {
                    0% { 
                        opacity: 1; 
                        transform: translate(0, 0) scale(0.5); 
                    }
                    50% { 
                        opacity: 1; 
                        transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(1); 
                    }
                    100% { 
                        opacity: 0; 
                        transform: translate(${Math.random() * 300 - 150}px, ${Math.random() * 300 - 150}px) scale(0); 
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Pop balloon
    popBalloon(balloon) {
        if (balloon.classList.contains('popped')) return;
        
        balloon.classList.add('popped');
        
        // Create pop effect
        this.createPopEffect(balloon);
        
        // Remove balloon after animation
        setTimeout(() => {
            balloon.style.visibility = 'hidden';
        }, 500);
    }

    createPopEffect(balloon) {
        const rect = balloon.getBoundingClientRect();
        const pop = document.createElement('div');
        pop.textContent = 'POP! 💥';
        pop.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            transform: translate(-50%, -50%);
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--color-primary);
            pointer-events: none;
            z-index: 1000;
            animation: popEffect 1s ease-out forwards;
        `;
        
        document.body.appendChild(pop);
        
        // Add pop animation if not exists
        if (!document.querySelector('#pop-effect-style')) {
            const style = document.createElement('style');
            style.id = 'pop-effect-style';
            style.textContent = `
                @keyframes popEffect {
                    0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (pop.parentNode) {
                pop.parentNode.removeChild(pop);
            }
        }, 1000);
    }

    // Create confetti
    createConfetti(count = 50) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            this.confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }
    }

    // Add touch feedback for mobile
    addTouchFeedback() {
        const touchElements = document.querySelectorAll('.btn, .balloon, .candle');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                element.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    element.style.transform = '';
                }, 150);
            });
            
            element.addEventListener('touchcancel', (e) => {
                element.style.transform = '';
            });
        });
    }
}

// Initialize the birthday page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayPage();
    
    // Add some fun mobile-specific features
    if ('ontouchstart' in window) {
        // Add haptic feedback simulation for supported devices
        document.addEventListener('touchstart', (e) => {
            if (e.target.matches('.btn, .balloon, .candle')) {
                // Vibrate if supported (Android primarily)
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        });
        
        // Prevent default touch behaviors that might interfere
        document.addEventListener('touchmove', (e) => {
            if (e.target.matches('.btn, .balloon, .candle')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    // Add celebration message in console
    console.log(`
    🎉🎂🎉🎂🎉🎂🎉🎂🎉🎂🎉🎂🎉
    
         Happy Birthday Seju! 
         Hope you have an amazing day! 
    
    🎂🎉🎂🎉🎂🎉🎂🎉🎂🎉🎂🎉🎂
    `);
});