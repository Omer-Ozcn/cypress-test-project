describe("Login Form Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Başarılı form doldurulduğunda submit edip success sayfasına yönlenir", () => {
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("ValidPass1!");
    cy.get("#terms").check();
    cy.get('button[type="submit"]').should("not.be.disabled").click();
    cy.url().should("include", "/success");
    cy.contains("Kayıt işleminiz başarıyla tamamlanmıştır").should("be.visible");
  });

  it("Hatalı email yazınca hata mesajı görünür ve buton disabled kalır", () => {
    cy.get("#email").type("yanlisemail");
    cy.get("#password").type("ValidPass1!");
    cy.get("#terms").check();

    cy.contains("Geçerli bir eposta adresi girin.").should("be.visible");
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Hatalı password yazınca hata mesajı görünür ve buton disabled kalır", () => {
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("123");
    cy.get("#terms").check();

    cy.contains("En az 8 karakter").should("be.visible");
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Tüm alanlar doğru ama terms seçilmemişken buton disabled olur", () => {
    cy.get("#email").type("test@example.com");
    cy.get("#password").type("ValidPass1!");
    cy.get('button[type="submit"]').should("be.disabled");
  });
});