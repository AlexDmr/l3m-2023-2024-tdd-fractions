import { illFormedException, fraction } from "./fractions";


describe("Instanciations de fractions impossibles", () => {
    it("shouldn't be possible to build the fraction 3/0", () => {
        expect(() => fraction(3, 0)).toThrow(illFormedException)
    });

    it("shouldn't be possible to build the fraction NaN/2", () => {
        expect(() => fraction(NaN, 2)).toThrow(illFormedException)
    });

    it("shouldn't be possible to build the fraction 7/NaN", () => {
        expect(() => fraction(7, NaN)).toThrow(illFormedException)
    });

    it("shouldn't be possible to build the fraction 3/Infinity", () => {
        expect(() => fraction(3, Infinity)).toThrow(illFormedException)
    });

    it("shouldn't be possible to build the fraction Infinity/8", () => {
        expect(() => fraction(Infinity, 8)).toThrow(illFormedException)
    });

});

describe("Instanciations de fractions possibles", () => {
    it("should be possible to build the fraction 3/2", () => {
        const f = fraction(3, 2);
        expect(f.numérateur()).toEqual(3);
        expect(f.dénominateur()).toEqual(2)
    });

    it("should be possible to build the fraction (-2)/(-5) from (-2)/(-5)", () => {
        const f = fraction(-2, -5);
        expect(f.numérateur()).toEqual(-2);
        expect(f.dénominateur()).toEqual(-5)
        expect(f.toString()).toEqual("(-2)/(-5)")
    });

    it("should be possible to build the fraction 2/(-5) from (2)/(-5)", () => {
        const f = fraction(2, -5);
        expect(f.numérateur()).toEqual(2);
        expect(f.dénominateur()).toEqual(-5)
        expect(f.toString()).toEqual("2/(-5)")
    });

    it("should be possible to build the fraction 3/(-7) from 3/(-7)", () => {
        const f = fraction(3, -7);
        expect(f.numérateur()).toEqual(3);
        expect(f.dénominateur()).toEqual(-7)
        expect(f.toString()).toEqual("3/(-7)")
    });

    it("should be possible to build the fraction (-5)/(-1) from (-5)/(-1), should serialized to '(-5)/(-1)'", () => {
        const f = fraction(-5, -1);
        expect(f.numérateur()).toEqual(-5);
        expect(f.dénominateur()).toEqual(-1)
        expect(f.toString()).toEqual("(-5)/(-1)")
    });

    it("should be possible to build the fraction 12/(-9) from (12)/(-9)", () => {
        const f = fraction(12, -9);
        expect(f.numérateur()).toEqual(12);
        expect(f.dénominateur()).toEqual(-9)
        expect(f.toString()).toEqual("12/(-9)")
    });

    it("should be possible to build the fraction (-3)/2", () => {
        const f = fraction(-3, 2);
        expect(f.numérateur()).toEqual(-3);
        expect(f.dénominateur()).toEqual(2)
        expect(f.toString()).toEqual("(-3)/2")
    });

    it("should be possible to build the fraction 5/1", () => {
        const f = fraction(5, 1);
        expect(f.numérateur()).toEqual(5);
        expect(f.dénominateur()).toEqual(1)
        expect(f.toString()).toEqual("5/1")
    });

});

describe("Simplification de fractions", () => {
    it("should be possible to simplify (-2)/(-5) into 2/5", () => {
        const f = fraction(-2, -5).simplify();
        expect(f.numérateur()).toEqual(2);
        expect(f.dénominateur()).toEqual(5)
        expect(f.toString()).toEqual("2/5")
    });

    it("should be possible to simplify (-2)/5 into (-2)/5", () => {
        const f = fraction(-2, 5).simplify();
        expect(f.numérateur()).toEqual(-2);
        expect(f.dénominateur()).toEqual(5)
        expect(f.toString()).toEqual("(-2)/5")
    });

    it("should be possible to simplify 3/(-7) into (-3)/7", () => {
        const f = fraction(3, -7).simplify();
        expect(f.numérateur()).toEqual(-3);
        expect(f.dénominateur()).toEqual(7)
        expect(f.toString()).toEqual("(-3)/7")
    });

    it("should be possible to simplify 256/(-64) into -4", () => {
        const f = fraction(256, -64).simplify();
        expect(f.numérateur()).toEqual(-4);
        expect(f.dénominateur()).toEqual(1)
        expect(f.toString()).toEqual("-4")
    });

})


describe("Multiplication de fractions", () => {
    it("should be possible to multiply 3/2 by 4/5 and get 12/10", () => {
        const f32 = fraction(3, 2);
        const f45 = fraction(4, 5);
        const f65 = f32.multiply(f45);
        expect(f65.numérateur()).toEqual(12)
        expect(f65.dénominateur()).toEqual(10)
        
        expect(f32.toString()).withContext("La fraction sur laquelle on appelle la multiplication reste inchangée").toEqual("3/2")
        expect(f45.toString()).withContext("Le paramètre de la multiplication rete inchangé").toEqual("4/5")
    });
});