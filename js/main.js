$(document).ready(function() {
    
    // Initialize Hero Carousel
    $(".hero-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        animateOut: 'fadeOut',
        smartSpeed: 1000
    });
    
    // Initialize Events Carousel
    $(".events-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        },
        navText: [
            "<i class='fas fa-chevron-left'></i>",
            "<i class='fas fa-chevron-right'></i>"
        ]
    });
    
    // Initialize Testimonial Carousel
    $(".testimonial-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });
    
    // Initialize Accommodation Carousel
    $(".accommodation-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText: [
            "<i class='fas fa-chevron-left'></i>",
            "<i class='fas fa-chevron-right'></i>"
        ]
    });
    
    // Counter Animation
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });
    
    // Sticky Header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('header').addClass('header-scrolled');
        } else {
            $('header').removeClass('header-scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    $('a.smooth-scroll').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 80
            }, 800);
            return false;
        }
    });
    
    // Animation on Scroll Initialization
    function animateOnScroll() {
        $('.animated-section').each(function() {
            var sectionPos = $(this).offset().top;
            var windowHeight = $(window).height();
            var scrollPos = $(window).scrollTop();
            
            if (scrollPos + windowHeight > sectionPos + 100) {
                $(this).addClass('animate');
            }
        });
    }
    
    $(window).scroll(function() {
        animateOnScroll();
    });
    
    // Run on initial load
    animateOnScroll();
    
    // Mobile Nav Toggle
    $('.mobile-nav-toggle').on('click', function() {
        $('.navbar-collapse').toggleClass('active');
    });
    
    // Form Validation
    $('.contact-form').submit(function(e) {
        e.preventDefault();
        
        // Basic validation
        var valid = true;
        
        $(this).find('[required]').each(function() {
            if ($(this).val() === '') {
                valid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        if (valid) {
            // In a real scenario, this would submit the form to a backend
            // Here we'll just show a success message
            $('.contact-form').hide();
            $('<div class="alert alert-success mt-4">Thank you for your message! We will get back to you soon.</div>').insertAfter('.contact-form');
        }
    });
    
    // Newsletter Form
    $('.newsletter-form').submit(function(e) {
        e.preventDefault();
        
        var emailInput = $(this).find('input[type="email"]');
        
        if (emailInput.val() === '') {
            emailInput.addClass('is-invalid');
        } else {
            emailInput.removeClass('is-invalid');
            emailInput.val('');
            
            // Show success message
            $('<div class="alert alert-light mt-3">Thank you for subscribing to our newsletter!</div>').insertAfter(this);
            
            // Remove success message after a few seconds
            setTimeout(function() {
                $('.newsletter-form + .alert').fadeOut(500, function() {
                    $(this).remove();
                });
            }, 4000);
        }
    });
    
    // Tooltip Initialization
    $('[data-bs-toggle="tooltip"]').tooltip();
    
    // Track Viewport for Animations
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };
    
    $(window).on('resize scroll', function() {
        $('.fade-in-section').each(function() {
            if ($(this).isInViewport()) {
                $(this).addClass('is-visible');
            }
        });
    });
    
    // Virtual Tour Video Modal (Campus Life & Admission Pages)
    $('.virtual-tour-image').on('click', function() {
        // In a real implementation, this would launch a video modal
        // Here we'll just redirect to the campus page
        if (window.location.pathname.includes('admission.html')) {
            window.location.href = 'campus.html';
        }
    });
    
    // Trigger on initial load
    $(window).trigger('scroll');
    
    // Campus Image Generator
    function generateCampusImages() {
        const images = [
            {
                name: 'campus_banner.jpg',
                prompt: 'Vibrant university campus scene with students engaged in various activities. Shows the quad area with people studying, socializing, and relaxing. Beautiful landscaping and modern buildings in background.'
            },
            {
                name: 'campus_life_main.jpg',
                prompt: 'Students participating in a campus festival or outdoor event. Shows diverse student body enjoying activities, food, music, and socializing. Colorful decorations and festive atmosphere.'
            },
            {
                name: 'dorm1.jpg',
                prompt: 'Modern university dormitory room designed for two students. Clean, well-lit space with beds, desks, storage, and technology amenities. Comfortable and functional design.'
            },
            {
                name: 'dorm2.jpg',
                prompt: 'Common area in student residence hall with comfortable seating, study space, and social areas. Students studying and socializing in a modern, well-designed space.'
            },
            {
                name: 'dorm3.jpg',
                prompt: 'Exterior view of modern student residence buildings on campus. Contemporary architecture with landscaped surroundings and outdoor gathering spaces.'
            },
            {
                name: 'dining1.jpg',
                prompt: 'Modern university dining hall interior with students enjoying meals. Bright, spacious area with diverse food stations and comfortable seating arrangements.'
            },
            {
                name: 'dining2.jpg',
                prompt: 'Students enjoying healthy meal options in a university cafeteria. Fresh salad bar and nutritious food choices in an inviting dining environment.'
            },
            {
                name: 'dining3.jpg',
                prompt: 'International cuisine section of a university dining hall. Various global food options with students from diverse backgrounds enjoying meals together.'
            },
            {
                name: 'dining_central.jpg',
                prompt: 'Main dining hall of a university campus. Spacious, modern interior with multiple food stations, seating areas, and students enjoying meals.'
            },
            {
                name: 'dining_global.jpg',
                prompt: 'Global fusion restaurant on university campus. International cuisine with modern decor and students enjoying diverse meals.'
            },
            {
                name: 'dining_cafe.jpg',
                prompt: 'Cozy campus cafe with students studying and socializing. Coffee bar, comfortable seating, and relaxed atmosphere in a university library setting.'
            },
            {
                name: 'dining_express.jpg',
                prompt: 'Campus express market with grab-and-go food options. Convenience store style setting with students purchasing quick meals and snacks.'
            },
            {
                name: 'activity1.jpg',
                prompt: 'International cultural festival on university campus. Students in traditional attire showcasing cultural performances, food, and displays.'
            },
            {
                name: 'activity2.jpg',
                prompt: 'University debate club in action. Students engaged in formal debate in a classroom or auditorium setting with audience.'
            },
            {
                name: 'activity3.jpg',
                prompt: 'University students engaged in community volunteer work. Group of diverse students helping at a local community project or charity event.'
            },
            {
                name: 'activity4.jpg',
                prompt: 'Student music performance on university campus. Band or orchestra performing at a campus venue with audience of students.'
            },
            {
                name: 'sports_facilities.jpg',
                prompt: 'Modern university sports center. Well-equipped gymnasium with fitness equipment, courts, and students exercising.'
            },
            {
                name: 'health_center.jpg',
                prompt: 'University health center reception area. Modern, welcoming medical facility on campus with staff and students.'
            },
            {
                name: 'culture_event1.jpg',
                prompt: 'Annual international festival on university campus. Colorful displays, performances, and students from diverse backgrounds sharing cultural traditions.'
            },
            {
                name: 'culture_event2.jpg',
                prompt: 'University arts week exhibition. Student artwork on display in a gallery setting with visitors viewing the pieces.'
            },
            {
                name: 'culture_event3.jpg',
                prompt: 'University leadership summit or conference. Professional setting with speakers, panel discussions, and student audience.'
            },
            {
                name: 'student_voice1.jpg',
                prompt: 'Portrait of an Asian male university student in casual attire smiling at camera. Professional headshot style against neutral background.'
            },
            {
                name: 'student_voice2.jpg',
                prompt: 'Portrait of a female Caucasian university student in business casual attire. Professional headshot style against neutral background.'
            },
            {
                name: 'student_voice3.jpg',
                prompt: 'Portrait of a Middle Eastern male graduate student in smart casual attire. Professional headshot style against neutral background.'
            }
        ];

        const apiKey = '8aa52af4-837b-43bc-bea6-50fd89b97dba:87482d30990d0b7567249088a382c0ba';
        const imageDownloadsDiv = document.getElementById('image-downloads');
        
        // Clear previous content
        imageDownloadsDiv.innerHTML = '';
        
        // Create status element
        const status = document.createElement('div');
        status.className = 'alert alert-info';
        status.textContent = `开始生成 ${images.length} 张图片...`;
        imageDownloadsDiv.appendChild(status);
        
        // Create progress bar
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress mb-3';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.width = '0%';
        progressBar.setAttribute('aria-valuenow', '0');
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        
        progressContainer.appendChild(progressBar);
        imageDownloadsDiv.appendChild(progressContainer);
        
        // Create image list container
        const imageList = document.createElement('div');
        imageList.className = 'list-group';
        imageDownloadsDiv.appendChild(imageList);
        
        // Counter for progress tracking
        let completed = 0;
        
        // Generate images sequentially to avoid overloading the API
        function generateNextImage(index) {
            if (index >= images.length) {
                status.className = 'alert alert-success';
                status.textContent = `完成生成 ${images.length} 张图片！`;
                return;
            }
            
            const img = images[index];
            
            // Create placeholder for this image
            const imgItem = document.createElement('div');
            imgItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            imgItem.innerHTML = `
                <span>${img.name}</span>
                <span class="badge bg-warning">生成中...</span>
            `;
            imageList.appendChild(imgItem);
            
            // Call API to generate image
            fetch('https://queue.fal.run/fal-ai/recraft/v3/text-to-image', {
                method: 'POST',
                headers: {
                    'Authorization': `Key ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: img.prompt,
                    style: 'realistic_image'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.images && data.images.length > 0) {
                    const imageUrl = data.images[0].url;
                    
                    // Update status
                    completed++;
                    progressBar.style.width = `${(completed / images.length) * 100}%`;
                    progressBar.setAttribute('aria-valuenow', completed);
                    
                    // Update list item with success and download link
                    imgItem.innerHTML = `
                        <span>${img.name}</span>
                        <span>
                            <a href="${imageUrl}" class="btn btn-sm btn-primary" download="${img.name}" target="_blank">下载</a>
                            <button class="btn btn-sm btn-success auto-apply" data-img="${img.name}" data-url="${imageUrl}">应用</button>
                        </span>
                    `;
                    
                    // Add click event to auto-apply button
                    imgItem.querySelector('.auto-apply').addEventListener('click', function() {
                        const imgName = this.getAttribute('data-img');
                        const imgUrl = this.getAttribute('data-url');
                        
                        // Find all matching images on the page and update their src
                        const imgElements = document.querySelectorAll(`img[src*="${imgName}"]`);
                        imgElements.forEach(el => {
                            el.src = imgUrl;
                        });
                        
                        // Show success message
                        this.textContent = '已应用';
                        this.disabled = true;
                    });
                } else {
                    // Update status for failure
                    completed++;
                    progressBar.style.width = `${(completed / images.length) * 100}%`;
                    progressBar.setAttribute('aria-valuenow', completed);
                    
                    imgItem.innerHTML = `
                        <span>${img.name}</span>
                        <span class="badge bg-danger">生成失败</span>
                    `;
                }
                
                // Generate next image
                setTimeout(() => generateNextImage(index + 1), 1000);
            })
            .catch(error => {
                // Update status for error
                completed++;
                progressBar.style.width = `${(completed / images.length) * 100}%`;
                progressBar.setAttribute('aria-valuenow', completed);
                
                imgItem.innerHTML = `
                    <span>${img.name}</span>
                    <span class="badge bg-danger">错误: ${error.message}</span>
                `;
                
                // Continue with next image
                setTimeout(() => generateNextImage(index + 1), 1000);
            });
        }
        
        // Start generating images
        generateNextImage(0);
    }

    // Add an admin panel if URL contains admin parameter
    if (window.location.search.includes('admin=true')) {
        const adminPanel = $('<div id="admin-panel" style="position: fixed; bottom: 20px; right: 20px; background: white; padding: 15px; border: 1px solid #ccc; border-radius: 5px; z-index: 1000; max-height: 80vh; overflow-y: auto; width: 400px;"></div>');
        const generateButton = $('<button class="btn btn-primary mb-3">生成校园图片</button>');
        const imageDownloads = $('<div id="image-downloads"></div>');
        
        generateButton.on('click', generateCampusImages);
        
        adminPanel.append(generateButton);
        adminPanel.append(imageDownloads);
        $('body').append(adminPanel);
    }
}); 