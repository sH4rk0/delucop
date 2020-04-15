import MissileSimple from "../gameObjects/MissileSimple";
import MissilePerforant from "../gameObjects/MissilePerforant";
import FlameThrower from "../gameObjects/FlameThrower";
import Game from "../scenes/Game";
export default class DelucopArm extends Phaser.GameObjects.Image {
  private _config: { scene: Game };
  private _armMove: boolean;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;

    this.create();
  }

  create() {
    this._armMove = true;
    //this._config.scene.physics.world.enable(this);

    this.setOrigin(0, 0.5);

    this._config.scene.add.existing(this);
  }

  armMove(): boolean {
    return this._armMove;
  }

  setArmMove(status: boolean) {
    this._armMove = status;
  }

  update(time: number, delta: number) {}

  launchMissile(pointer: Phaser.Input.Pointer) {
    this._config.scene.tweens.add({
      targets: this,
      x: "-=5",
      yoyo: true,
      repeat: 0,
      duration: 100,
    });
    let _angle = this.getShootAngle(pointer);
    let _bulletStart = this.calculateBullet(_angle);

    let _missile: MissileSimple = new MissileSimple({
      scene: this._config.scene,
      x: _bulletStart.x,
      y: _bulletStart.y,
      key: "missile",
      options: {
        angle: _angle,
        pointer: pointer,
        speed: 12,
      },
    });

    this._config.scene._shootGroup.add(_missile);
  }

  launchPerforant(pointer: Phaser.Input.Pointer) {
    this._config.scene.tweens.add({
      targets: this,
      x: "-=5",
      yoyo: true,
      repeat: 0,
      duration: 100,
    });
    let _angle = this.getShootAngle(pointer);
    let _bulletStart = this.calculateBullet(_angle);

    let _missile: MissilePerforant = new MissilePerforant({
      scene: this._config.scene,
      x: _bulletStart.x,
      y: _bulletStart.y,
      key: "missile",
      options: {
        angle: _angle,
        pointer: pointer,
        speed: 16,
      },
    });

    this._config.scene._shootGroup.add(_missile);
  }

  calculateBullet(_angle: number): { x: number; y: number } {
    /*let graphics = this._config.scene.add.graphics({
      lineStyle: { width: 2, color: 0x00ff00 },
      fillStyle: { color: 0xff0000 },
    });*/
    let circle = new Phaser.Geom.Circle(
      this._config.scene.getArmPosition().x,
      this._config.scene.getArmPosition().y,
      82
    );
    let CircumferencePoint: Phaser.Geom.Point = Phaser.Geom.Circle.CircumferencePoint(
      circle,
      _angle - 0.15
    );
    //graphics.destroy();

    return { x: CircumferencePoint.x, y: CircumferencePoint.y };
  }

  getShootAngle(pointer: Phaser.Input.Pointer): number {
    let _angle = Phaser.Math.Angle.BetweenPoints(
      this._config.scene.getArmPosition(),
      this._config.scene.recalculatePointer(pointer)
    );

    if (_angle < -1.3) _angle = -1.3;
    if (_angle > 0.8) _angle = 0.8;

    return _angle;
  }
}
