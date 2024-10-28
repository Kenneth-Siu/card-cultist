import enemy from "../../../../../public/templates/enemies/enemyCyber.png";
import enemySubtitle from "../../../../../public/templates/enemies/enemySubtitleCyber.png";
import EnemyFace from "../EnemyFace/EnemyFace";

export default class CyberspaceEnemyFace extends EnemyFace {
    static type = "Cyberspace Enemy";
    static frame = enemy;
    static frameSubtitle = enemySubtitle;

    constructor(face) {
        super(face, CyberspaceEnemyFace.type);
        this.frame = enemy;
        this.frameSubtitle = enemySubtitle;
    }
}
