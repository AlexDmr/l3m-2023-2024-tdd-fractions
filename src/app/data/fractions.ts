/**
 * Interface définissant une fraction
 */
export interface Fraction {
    /**
     * Formatte prioritairement la fraction en string "[-] entier si c'est possible
     * ou en string "[-]numérateur/dénominateur" si la forme la plus simple est une fraction
     */
    toString(): string;

    /**
     * Renvoie la forme simplifié de la fraction.
     * La forme irréductible.
     */
    simplify(): Fraction;

    /**
     * Accesseur pour obtenir le nominateur
     */
    numérateur(): number;

    /**
     * Accesseur pour obtenir le dénominateur
     */
    dénominateur(): number;

    /**
     * Multiplie la fraction par f.
     * Renvoie le résultat sous forme simplifié.
     * Renvoie une nouvelle fraction, résultat de cette multiplication
     * La fraction reste inchangée.
     * @param f La fraction avec laquelle on va multiplier. Reste inchangée.
     */
    multiply(f: Fraction): Fraction;
}

/**
 * Définition de l'exception à lever lorsqu'on tente de construire une fraction mal formée
 */
export const illFormedException = new Error("ILL FORMED fraction, should be of the form Z/Z")


/**
 * Construit, si c'est possible, une fraction à partir d'un nominateur et d'un dénominateur (tous deux dans Z)
 * Renvoie la forme simplifiée de la fraction.
 * @param numérateur Un entier relatif
 * @param dénominateur Un entier relatif différent de 0
 * @returns La fraction nominateur / dénominateur si les contraintes sont respectées
 * @throws "ILL FORMED fraction, should be of the form Z/Z"
 */
export function fraction(numérateur: number, dénominateur: number, simplified = false): Fraction {
    if (!Number.isInteger(numérateur)
        || !Number.isInteger(dénominateur)
        || dénominateur === 0
    ) throw illFormedException;

    const n = numérateur
    const d = dénominateur

    // Sérialise un entier Z, met les parenthèses si négatif
    function seriN(n: number): string {
        return n >= 0 ? `${n}` : `(${n})`
    }
    let str = (simplified && d === 1) ? `${n}` : `${seriN(n)}/${seriN(d)}`

    return {
        toString: () => str,
        numérateur: () => numérateur,
        dénominateur: () => dénominateur,
        multiply: (f: Fraction) => fraction(n * f.numérateur(), d * f.dénominateur()),
        simplify: () => {
            const s = Math.sign(numérateur) * Math.sign(dénominateur)
            const N = Math.abs(numérateur);
            const D = Math.abs(dénominateur);

            const pgcd = euclide(N, D);

            const n = N / pgcd
            const d = D / pgcd
            
            return fraction(s*n, d, true)
        }
    }
}



/**
 * Calcule le PGCD de deux entiers positifs
 * A compléter pour prendre en charge les nombres non entier positifs.
 * @param a Un entier positif
 * @param b Un entier positif
 * @returns Le PGCD de a et b
 */
function euclide(a: number, b: number) {

    while (a !== b) {
        if (a > b) {
            a = a - b;
        } else {
            b = b - a;
        }
    }

    return a
}
