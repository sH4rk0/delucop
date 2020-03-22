import MissileSimple from "../gameObjects/MissileSimple";
import MissilePerforant from "../gameObjects/MissilePerforant";
import FlameThrower from "../gameObjects/FlameThrower";
import Game from "../scenes/Game";
export default class DelucopArm extends Phaser.Physics.Arcade.Sprite {
  private _config: { scene: Game };
  private _armMove: boolean;

  constructor(params: any) {
    super(params.scene, params.x, params.y, params.key);
    this._config = params;

    this.create();
  }

  create() {
    this._armMove = true;
    this._config.scene.physics.world.enable(this);

    this.setOrigin(0, 0.5)
      .setDepth(12)
      .setScale(0.5);

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
    let _angle = Phaser.Math.Angle.BetweenPoints(
      this,
      this._config.scene.recalculatePointer(pointer)
    );

    if (_angle < -1.3) _angle = -1.3;
    if (_angle > 0.8) _angle = 0.8;

    let _missile: MissileSimple = new MissileSimple({
      scene: this._config.scene,
      x: this.x,
      y: this.y,
      key: "missile",
      options: {
        angle: _angle,
        pointer: pointer,
        speed: 12
      }
    });

    this._config.scene._missileGroup.add(_missile);
  }

  launchPerforant(pointer: Phaser.Input.Pointer) {
    let _angle = Phaser.Math.Angle.BetweenPoints(
      this,
      this._config.scene.recalculatePointer(pointer)
    );

    if (_angle < -1.3) _angle = -1.3;
    if (_angle > 0.8) _angle = 0.8;

    let _missile: MissilePerforant = new MissilePerforant({
      scene: this._config.scene,
      x: this.x,
      y: this.y,
      key: "missile",
      options: {
        angle: _angle,
        pointer: pointer,
        speed: 16
      }
    });

    this._config.scene._missileGroup.add(_missile);
  }
}
