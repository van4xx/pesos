// Обработка событий после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Элементы меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.getElementById('header');
    const backToTop = document.querySelector('.back-to-top');
    
    // Обработчик мобильного меню
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Закрываем мобильное меню при клике на ссылку
            if (navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Учитываем высоту шапки
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Изменение шапки при прокрутке
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('show');
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
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                
                let formattedValue = '+7';
                
                if (value.length > 0) {
                    formattedValue += ' (' + value.substring(0, 3);
                }
                
                if (value.length > 3) {
                    formattedValue += ') ' + value.substring(3, 6);
                }
                
                if (value.length > 6) {
                    formattedValue += '-' + value.substring(6, 8);
                }
                
                if (value.length > 8) {
                    formattedValue += '-' + value.substring(8, 10);
                }
                
                e.target.value = formattedValue;
            }
        });
    }
}); 