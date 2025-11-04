/// <reference types="cypress" />

import Single_ProductPage from '../../PageObject/pages/Single_ProductPage.js'
import HomePage from '../../PageObject/pages/HomePage.js'
import CheckoutPage from '../../PageObject/pages/CheckoutPage.js'  
import LoginPage from '../../PageObject/pages/LoginPage.js'       
import Navbar from '../../PageObject/components/Navbar.js'        

describe('Ecommerce Smoke Suite', function () {

  beforeEach(function () {
    // Clear all browser storage before each test for isolation
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })

    // Visit the e-commerce site
    cy.visit('https://demo.codenbox.com/')
    cy.url().should('include', 'demo')
    Cypress.config('defaultCommandTimeout', 8000)

    // Load test data from fixtures
    cy.fixture('testData').as('testData')
  })

  it('Component test', function () {
    const productName = 'MacBook'
    Cypress.config('defaultCommandTimeout', 8000)

    // Test search functionality
    Navbar.searchProduct(productName)
    Navbar.validateAllSearchResults(productName).each(($el, index, $list) => {
        cy.wrap($el).should('contain.text', productName)
    })
    
    // Test navigation components
    Navbar.clickOnMyAccount()
    Navbar.clickOnLogin()
    Navbar.clickOnLogo()
  })

  it('e-2-e smoke test', function () {
    const productName = 'MacBook'
    const expectedPrice = '$602.00'
    const success = "Success"

    // ========================================
    // 1. PRODUCT DISCOVERY
    // ========================================
    
    // Verify homepage displays 4 products
    HomePage.displayProducts().should('have.length', 4)

    // Filter and select the MacBook product
    HomePage.selectProducts(productName)

    // ========================================
    // 2. PRODUCT VALIDATION
    // ========================================
    
    // Validate product name
    Single_ProductPage.getProductName().should('be.visible').and('have.text', productName)
    
    // Validate product price
    Single_ProductPage.getProductPrice().should('be.visible').and('have.text', expectedPrice)
    
    // Verify product description tab
    Single_ProductPage.getProductDescription().should('have.text', 'Description')

    // Validate product description contains expected text
    const descriptionText = 'Intel Core 2 Duo processor'
    Single_ProductPage.validateProductDescription().invoke('text').then(function (des) {
      des = des.trim()
      expect(des).to.equal(descriptionText)
    })
    
    // ========================================
    // 3. REVIEW SUBMISSION
    // ========================================
    
    // Navigate to reviews tab
    cy.get('#content > .nav > :nth-child(3) > .nav-link').click()
    cy.wait(500)
    
    // Submit a product review using test data
    cy.get('@testData').then((data) => {
      cy.get('#input-author').type(data.name)
      cy.get('#input-text').type(data.review)
      
      // Select 5-star rating
      Single_ProductPage.clickOnRating()
      
      // Submit the review
      Single_ProductPage.submitReview()
      
      // Validate success message
      Single_ProductPage.validateSuccessMessage().should('be.visible')
        .invoke('text').then(function (text) {
          expect(text.trim()).to.equal(data.successMessage)
        })
    })

    // ========================================
    // 4. CART OPERATIONS
    // ========================================
    
    // Add product to cart
    Single_ProductPage.clickOnCart()
    Single_ProductPage.validateCartSuccessMessage().should('be.visible')
      .and('contain', success)

    // Open cart dropdown menu and validate contents
    cy.wait(2000)
    cy.get('.dropdown.d-grid').click()
    cy.get('.dropdown-menu.dropdown-menu-end.p-2.show').should('be.visible')
      .and('contain', 'x 1')
      .and('contain', '$602.00')
      .and('contain', 'View Cart')
      .and('contain', 'Checkout')

    // ========================================
    // 5. CHECKOUT PROCESS
    // ========================================
    
    // Navigate to checkout
    Single_ProductPage.clickOnCheckout()

    // Open login modal
    CheckoutPage.clickOnLoginLink()

    // ========================================
    // 6. AUTHENTICATION TESTS
    // ========================================
    
    // NEGATIVE TEST: Login with invalid credentials
    LoginPage.failedLogin()

    // Validate error message appears
    LoginPage.getWarningMessage().should('be.visible')
      .invoke('text').then((text) => {
        expect(text.trim()).to.equal(this.testData.warning)
      })

    // POSITIVE TEST: Login with valid credentials
    LoginPage.successLogin()

    // ========================================
    // 7. ORDER VALIDATION
    // ========================================
    
    // Validate checkout page and order totals
    CheckoutPage.validateCheckoutAmount()

  })

})