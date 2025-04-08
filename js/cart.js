document.addEventListener('DOMContentLoaded', function() {
    // Cart Functionality
    const cart = {
        items: [],
        total: 0,
        
        addItem: function(product) {
            const existingItem = this.items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    ...product,
                    quantity: 1
                });
            }
            
            this.calculateTotal();
            this.updateCartDisplay();
            this.saveToLocalStorage();
        },
        
        removeItem: function(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.calculateTotal();
            this.updateCartDisplay();
            this.saveToLocalStorage();
        },
        
        updateQuantity: function(id, newQuantity) {
            const item = this.items.find(item => item.id === id);
            
            if (item) {
                item.quantity = newQuantity;
                this.calculateTotal();
                this.updateCartDisplay();
                this.saveToLocalStorage();
            }
        },
        
        calculateTotal: function() {
            this.total = this.items.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);
        },
        
        updateCartDisplay: function() {
            const cartCount = document.querySelector('.cart-count');
            const cartItemsContainer = document.querySelector('.cart-items');
            const cartTotal = document.querySelector('.total-amount');
            
            // Update cart count
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Update cart items
            cartItemsContainer.innerHTML = '';
            
            if (this.items.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            } else {
                this.items.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    cartItem.innerHTML = `
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <span>${item.quantity}</span>
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </div>
                        <button class="remove-item" data-id="${item.id}">×</button>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });
            }
            
            // Update total
            cartTotal.textContent = `$${this.total.toFixed(2)}`;
        },
        
        saveToLocalStorage: function() {
            localStorage.setItem('zenshin-cart', JSON.stringify({
                items: this.items,
                total: this.total
            }));
        },
        
        loadFromLocalStorage: function() {
            const savedCart = localStorage.getItem('zenshin-cart');
            
            if (savedCart) {
                const { items, total } = JSON.parse(savedCart);
                this.items = items || [];
                this.total = total || 0;
                this.updateCartDisplay();
            }
        }
    };
    
    // Initialize cart
    cart.loadFromLocalStorage();
    
    // Cart Toggle
    const cartToggle = document.querySelector('.cart-toggle');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');
    
    cartToggle.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });
    
    cartClose.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });
    
    // Add to Cart Buttons
    document.querySelectorAll('.btn-addtocart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.dataset.id || Math.random().toString(36).substr(2, 9),
                name: productCard.querySelector('h3').textContent,
                price: parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '')),
                image: productCard.querySelector('img').src
            };
            
            cart.addItem(product);
            
            // Visual feedback
            const feedback = document.createElement('div');
            feedback.className = 'add-to-cart-feedback';
            feedback.textContent = 'Added to cart';
            productCard.appendChild(feedback);
            
            setTimeout(() => {
                feedback.remove();
            }, 2000);
        });
    });
    
    // Cart Item Quantity Controls
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const id = e.target.dataset.id;
            const item = cart.items.find(item => item.id === id);
            
            if (item) {
                if (e.target.classList.contains('minus')) {
                    const newQuantity = Math.max(1, item.quantity - 1);
                    cart.updateQuantity(id, newQuantity);
                } else if (e.target.classList.contains('plus')) {
                    cart.updateQuantity(id, item.quantity + 1);
                }
            }
        }
        
        if (e.target.classList.contains('remove-item')) {
            const id = e.target.dataset.id;
            cart.removeItem(id);
        }
    });
    
    // Checkout Button
    document.querySelector('.btn-checkout').addEventListener('click', function() {
        if (cart.items.length > 0) {
            // In a real implementation, this would redirect to checkout
            alert('Proceeding to checkout with ' + cart.items.reduce((sum, item) => sum + item.quantity, 0) + ' items');
        } else {
            alert('Your cart is empty');
        }
    });
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // In a real implementation, you would send this to your email service
        console.log('Subscribed email:', email);
        
        // Show feedback
        emailInput.value = '';
        const feedback = document.createElement('p');
        feedback.className = 'newsletter-feedback';
        feedback.textContent = 'Thank you for subscribing';
        this.appendChild(feedback);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    });
});