// Обработка событий после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Элементы меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');
    const backToTop = document.querySelector('.back-to-top');
    const headerContent = document.querySelector('.header-content');
    
    // Обработчик мобильного меню
    if (mobileMenuBtn && headerContent) {
        mobileMenuBtn.addEventListener('click', () => {
            headerContent.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Закрытие мобильного меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (headerContent.classList.contains('active')) {
                headerContent.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Закрытие мобильного меню при клике вне меню
    document.addEventListener('click', (e) => {
        if (headerContent && headerContent.classList.contains('active')) {
            if (!e.target.closest('.header-content') && !e.target.closest('.mobile-menu-btn')) {
                headerContent.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Закрываем мобильное меню при клике на ссылку
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Изменение шапки при прокрутке
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });
    
    // Кнопка "Наверх"
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Функционал табов в разделе "Области применения"
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Удаляем активный класс у всех кнопок и панелей
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Добавляем активный класс выбранной кнопке
                this.classList.add('active');
                
                // Находим и показываем соответствующую панель
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Слайдер отзывов
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    if (testimonials.length > 0) {
        // Функция для показа определенного слайда
        function showSlide(index) {
            // Скрываем все слайды
            testimonials.forEach(slide => slide.style.display = 'none');
            
            // Убираем активный класс у всех точек
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Показываем нужный слайд и активируем соответствующую точку
            testimonials[index].style.display = 'block';
            dots[index].classList.add('active');
            
            // Обновляем текущий индекс
            currentSlide = index;
        }
        
        // Инициализация слайдера
        showSlide(currentSlide);
        
        // Следующий слайд
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentSlide = (currentSlide + 1) % testimonials.length;
                showSlide(currentSlide);
            });
        }
        
        // Предыдущий слайд
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
                showSlide(currentSlide);
            });
        }
        
        // Навигация по точкам
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Автоматическое переключение слайдов
        setInterval(function() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    // Валидация и отправка формы
    const contactForm = document.getElementById('quartz-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Здесь можно добавить логику отправки данных на сервер
            // Например, с использованием fetch API
            
            // Имитация отправки данных
            setTimeout(function() {
                // Отображаем сообщение об успешной отправке
                alert('Спасибо за ваш запрос! Мы свяжемся с вами в ближайшее время.');
                
                // Очищаем форму
                contactForm.reset();
            }, 1000);
        });
    }
    
    // Анимация элементов при прокрутке
    function animateOnScroll() {
        const elements = document.querySelectorAll('.product-card, .advantage-item, .testimonial-content, .contact-item, .about-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }
    
    // Вызываем функцию анимации при загрузке и прокрутке
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Добавляем маску для телефонного номера
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        let masked = '+7 (___) ___-__-__';
        let current = 0;
        let template = masked.replace(/\D/g, '');
        let def = masked.replace(/\D/g, '');

        input.addEventListener('input', function(e) {
            let val = this.value.replace(/\D/g, '');
            let i = 0;
            
            if (def.length >= val.length) {
                val = def;
            }
            
            this.value = masked.replace(/./g, function(a) {
                if (/[_\d]/.test(a) && i < val.length) {
                    return val.charAt(i++);
                } else if (i >= val.length) {
                    return '';
                } else {
                    return a;
                }
            });
        });

        input.addEventListener('focus', function() {
            if (this.value.length === 0) {
                this.value = '+7 (';
                current = 3;
            }
        });
    });

    // Статистика с анимацией
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000; // 2 секунды
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                }
            }, 16);
        });
        
        animated = true;
    }

    // Анимация при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === statsSection) {
                    animateStats();
                }
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });

    // Фильтрация продуктов
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Удаляем активный класс у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            productCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Модальные окна
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.querySelector(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Видео в фоне
    const video = document.getElementById('hero-video');
    if (video) {
        video.play().catch(function(error) {
            console.log("Автовоспроизведение видео отключено");
        });
    }
}); 