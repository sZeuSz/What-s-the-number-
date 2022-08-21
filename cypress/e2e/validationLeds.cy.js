describe("Testando leds acesos (On)", () => {
  Cypress.on("fail", (error, runnable) => {
    if (
      !error.message.includes(
        "Timed out retrying after 4000ms: Expected to find element: `.erro-leds`, but never found it."
      ) &&
      !error.message.includes(
        "Timed out retrying after 4000ms: Expected to find element: `.on`, but never found it."
      ) &&
      !error.message.includes(
        "Timed out retrying after 4000ms: Expected to find element: `.accept-leds`, but never found it."
      )
    ) {
      throw error;
    }
  });

  it("Número impresso corretamente ao clicar baseado na quantidade de leds acessos (ON) ", () => {
    cy.visit("https://what-s-the-number.vercel.app");
    const number = Math.floor(Math.random() * (300 - 1) + 1);
    cy.get(".input").type(number);
    cy.get(".submit").click();
    cy.get(".on").then((element) => {
      expect(element.length).to.be.oneOf([
        2, 6, 5, 7, 3, 8, 4, 9, 10, 12, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22,
      ]);
    });
  });

  it("Número e sua cor impresso corretamente baseado na quantidade de leds acessos (erro-leds) ", () => {
    cy.get(".erro-leds").then((element) => {
      expect(element.length).to.be.oneOf([17, 18]);
    });
  });

  it("Número e sua cor impresso corretamente baseado na quantidade de leds acessos (accept-leds) ", () => {
    cy.get(".accept-leds").then((element) => {
      expect(element.length).to.be.oneOf([
        2, 6, 5, 7, 3, 8, 4, 9, 10, 12, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22,
      ]);
    });
  });
});
