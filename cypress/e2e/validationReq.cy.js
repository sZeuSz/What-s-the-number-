describe("Testando requisição", () => {
  it("Requisição retorna status 400 se não for enviado parâmetros corretos ou 502", () => {
    cy.request({
      method: "get",
      url: "https://us-central1-ss-devops.cloudfunctions.net/rand",
      failOnStatusCode: false,
    }).then((resp) => {
      resp.status === 502
        ? expect(resp.status).to.eq(502)
        : expect(resp.status).to.eq(400);
    });
    cy.request({
      method: "get",
      url: "https://us-central1-ss-devops.cloudfunctions.net/rand?max=300",
      failOnStatusCode: false,
    }).then((resp) => {
      resp.status === 502
        ? expect(resp.status).to.eq(502)
        : expect(resp.status).to.eq(400);
    });
    cy.request({
      method: "get",
      url: "https://us-central1-ss-devops.cloudfunctions.net/rand?min=300",
      failOnStatusCode: false,
    }).then((resp) => {
      resp.status === 502
        ? expect(resp.status).to.eq(502)
        : expect(resp.status).to.eq(400);
    });

    cy.request({
      method: "get",
      url: "https://us-central1-ss-devops.cloudfunctions.net/rand?min=300&max=1",
      failOnStatusCode: false,
    }).then((resp) => {
      resp.status === 502
        ? expect(resp.status).to.eq(502)
        : expect(resp.status).to.eq(400);
    });
  });
  it("Requisição retorna status 200 se os parâmetros forem enviados corretamente ou 502", () => {
    cy.request({
      method: "get",
      url: "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300",
      failOnStatusCode: false,
    }).then((resp) => {
      resp.status === 502
        ? expect(resp.status).to.eq(502)
        : expect(resp.status).to.eq(200);
    });
  });

  it("Requisição retorna body com campo value se tiver sucesso ou 502", () => {
    cy.request({
      method: "get",
      url: "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300",
      failOnStatusCode: false,
    }).then((resp) => {
      if (resp.status === 502) expect(resp.status).to.eq(502);
      else {
        expect(resp.status).to.eq(200);
        expect(resp.body).to.have.property("value");
        expect(resp.body).to.satisfy(({ value }) => typeof value === "number");
        expect(resp.body).to.satisfy(({ value }) => value > 0 && value <= 300);
      }
    });
  });
});
