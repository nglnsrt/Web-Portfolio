// Hamburger toggle functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
       
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
         
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
    
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
            
            navItems.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.main-header') && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(document.querySelector('.skills-section'));
});

document.addEventListener('DOMContentLoaded', function() {
    const orbitIcons = document.querySelectorAll('.skill-circle');
    
    orbitIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.closest('.orbit-icon').style.animationPlayState = 'paused';
            icon.style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.closest('.orbit-icon').style.animationPlayState = 'running';
            icon.style.transform = 'scale(1)';
        });
    });

    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    document.body.appendChild(tooltip);
    
    orbitIcons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            tooltip.textContent = icon.title;
            tooltip.style.top = (e.clientY - 40) + 'px';
            tooltip.style.left = (e.clientX - tooltip.offsetWidth/2) + 'px';
            tooltip.style.opacity = '1';
        });
        
        icon.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
});
 
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateOnScroll = () => {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    };
    

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
    });
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    document.addEventListener('DOMContentLoaded', function() {

        const modal = document.getElementById('achievementModal');
        const modalTitle = document.getElementById('modalTitle');
        const mediaContainer = document.getElementById('mediaContainer');
        const closeBtn = document.querySelector('.close-modal');

        document.querySelectorAll('.achievement-item').forEach(item => {
            item.addEventListener('click', function() {
                const mediaType = this.getAttribute('data-media-type');
                const mediaSrc = this.getAttribute('data-media-src');
                const title = this.getAttribute('data-title');
  
                modalTitle.textContent = title;
                mediaContainer.innerHTML = '';
                
                if (mediaType === 'image') {
                    mediaContainer.innerHTML = `<img src="${mediaSrc}" alt="${title}">`;
                } else if (mediaType === 'video') {
                    mediaContainer.innerHTML = `
                        <video controls autoplay>
                            <source src="${mediaSrc}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    `;
                }
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';

            const videos = mediaContainer.querySelectorAll('video');
            videos.forEach(video => video.pause());
        });
 
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                const videos = mediaContainer.querySelectorAll('video');
                videos.forEach(video => video.pause());
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {

    const filterBtns = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
  
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            workItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
            document.querySelectorAll('.work-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            });
        });
    });
    
    const animateOnScroll = () => {
        workItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };
    
    workItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
        <span>Sending...</span>
        <svg class="spinner" viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                <animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/>
            </path>
        </svg>
    `;
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {

            const successEl = document.createElement('div');
            successEl.className = 'form-success';
            successEl.innerHTML = `
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M9 20.42L2.79 14.21L5.62 11.38L9 14.77L18.88 4.88L21.71 7.71L9 20.42Z"/>
                </svg>
                Message sent successfully!
            `;
            form.parentNode.insertBefore(successEl, form.nextSibling);
            form.reset();
            
            setTimeout(() => successEl.remove(), 5000);
        } else {
            throw new Error('Failed to send');
        }
    } catch (error) {
        const name = encodeURIComponent(form.name.value);
        const email = encodeURIComponent(form.email.value);
        const message = encodeURIComponent(form.message.value);
        window.location.href = `mailto:angelinasarteofficial@gmail.com?subject=Portfolio Message&body=Name: ${name}%0AEmail: ${email}%0A%0AMessage: ${message}`;
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});