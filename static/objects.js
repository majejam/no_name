class Player{
    // Element(0xffffff, scene, 'Dodecahedron', 1, 1, 1, 1, 0, 0, 0)
    constructor(color, scene, radius, height, definition, size, posx, posy, posz, id){
        this.scene = scene 
        this.id = id
        this.container = new THREE.Object3D()
        this.posx = posx
        this.posy = posy
        this.posz = posz
        this.size = size
        this.radius = radius
        this.height = height 
        this.definition = definition
        this.color = color 
        this.force = 0
        this.rotation_force = 0 
        this.increment = 4 
        this.randforce = 0.001 + Math.random()/400
        this.smallElement = new Array()
        this.setCube()
        this.setScene()
    }

    setCube()
    {
        this.element = {}

        this.element.geometry = new THREE.BoxBufferGeometry(this.size, this.size, this.size)
        this.element.material = new THREE.MeshStandardMaterial({
            color: this.color, 
            flatShading: true,
            metalness: 0.5,
            roughness: 1,
        })

        this.element.mesh = new THREE.Mesh(this.element.geometry, this.element.material)
        this.element.mesh.position.x = this.posx
        this.element.mesh.position.y = this.posy
        this.element.mesh.position.z = this.posz
        this.element.mesh.name = this.id
        this.container.add(this.element.mesh)
    }

    setScene()
    {
        this.scene.add(this.container)  
    }

    returnObj()
    {
        return this.container
    }
}
console.log(('hefn'));
