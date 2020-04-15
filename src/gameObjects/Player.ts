import DelucopArm from "./DeluCopArm";
import DeluCop from "./DeluCop";
import FlameThrower from "./FlameThrower";

export default class Player extends Phaser.GameObjects.Container {
  private _config: { scene: Phaser.Scene };
  private _delucopArm: DelucopArm;
  private _delucop: DeluCop;
  private _flame: FlameThrower;
  private _gfx: Phaser.GameObjects.Graphics;
  private _line: Phaser.Geom.Line;
  private _scaleFactor: number = 0.5;
  private _armMove: boolean;
  private _head: Phaser.GameObjects.Image;

  constructor(params: { scene: Phaser.Scene; x: number; y: number }) {
    super(params.scene, params.x, params.y);
    this._config = params;

    this.create();
  }

  create() {
    /* this._gfx = this._config.scene.add.graphics().setDefaultStyles({
      lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 },
    });
    this._line = new Phaser.Geom.Line();
    */
    this._armMove = false;
    this.setSize(100, 250);

    this._config.scene.physics.world.enable(this);
    //@ts-ignore
    this.body.setOffset(90, -150);
    this._delucopArm = new DelucopArm({
      scene: this._config.scene,
      x: 90,
      y: -230,
      key: "arm",
    });

    this._delucop = new DeluCop({
      scene: this._config.scene,
      x: 0,
      y: 0,
      key: "robocop",
    });

    this._flame = new FlameThrower({
      scene: this._config.scene,
      x: 0,
      y: 0,
      key: "empty",
    });

    this._config.scene.input.on(
      "pointermove",
      (pointer: Phaser.Input.Pointer) => {
        if (this._armMove) {
          this.setArmRotation(pointer);
        }
      }
    );

    this._head = this._config.scene.add
      .image(80, -266, "player-head")
      .setOrigin(0.5);
    this.add([this._delucopArm, this._delucop, this._head]);
    this.setDepth(10000).setScale(this._scaleFactor);
    this._config.scene.add.existing(this);
  }

  getArm(): DelucopArm {
    return this._delucopArm;
  }

  getFlame(): Phaser.GameObjects.Group {
    return this._flame.getColliderGroup();
  }

  setArmMove(move: boolean) {
    this._armMove = move;
    this._delucopArm.setArmMove(move);
  }

  enableFlame(): void {
    this._flame.enable();
  }
  disableFlame(): void {
    this._flame.disable();
  }

  setArmRotation(pointer: Phaser.Input.Pointer) {
    if (this.armMove()) {
      let _angle = Phaser.Math.Angle.BetweenPoints(
        this.getArmPosition(),
        this.recalculatePointer(pointer)
      );

      /* Phaser.Geom.Line.SetToAngle(
        this._line,
        this.getArmPosition().x,
        this.getArmPosition().y,
        _angle,
        128
      );
     this._gfx.clear().strokeLineShape(this._line).setDepth(100000);*/

      if (_angle > -1.3 && _angle < 0.8) {
        // console.log(this.calculateBullet(_angle));
        this._delucopArm.setRotation(_angle);
        this._head.setRotation(_angle * 0.25);

        this._flame.setCustomAngle(_angle);
      }
    } else {
      this._delucopArm.setRotation(0);
    }
  }

  calculateBullet(_angle: number): { x: number; y: number } {
    return this._delucopArm.calculateBullet(_angle);
  }
  getArmPosition(): Phaser.Geom.Point {
    /* console.log(
      this._delucopArm.y,
      this.y,
      this._delucopArm.y * -1 * this._scaleFactor + this.y
    );*/
    return new Phaser.Geom.Point(
      this._delucopArm.x * this._scaleFactor + this.x,
      this._delucopArm.y * this._scaleFactor + this.y
    );

    /* return new Phaser.Geom.Point(
      this._delucopArm.x + this._delucop.x * -1 * this._scaleFactor,
      this._delucop.y - this._delucopArm.y * -1 * this._scaleFactor
    );*/
  }

  recalculatePointer(pointer: Phaser.Input.Pointer): Phaser.Geom.Point {
    return new Phaser.Geom.Point(
      pointer.x + this._config.scene.cameras.main.scrollX,
      pointer.y + this._config.scene.cameras.main.scrollY
    );
  }

  armMove(): boolean {
    return this._delucopArm.armMove();
  }

  startWalk(): void {
    //@ts-ignore
    this.body.setVelocityX(50);
    this._delucop.startWalk();
  }
  stopWalk(): void {
    //@ts-ignore
    this.body.setVelocityX(0);
    this._delucop.stopWalk();
  }

  launchMissile(pointer: Phaser.Input.Pointer) {
    this._delucopArm.launchMissile(pointer);
  }
  launchPerforant(pointer: Phaser.Input.Pointer) {
    this._delucopArm.launchPerforant(pointer);
  }

  isFlameThrowerActive(): boolean {
    return this._flame.isActive();
  }
  flameThrower() {
    if (this._flame.isActive()) {
      this._flame.disable();
    } else {
      this._flame.enable();
    }
  }

  delucop(): DeluCop {
    return this._delucop;
  }

  update(time: number, delta: number) {
    this._delucop.update(time, delta);
    this._flame.update(time, delta);
  }
}
