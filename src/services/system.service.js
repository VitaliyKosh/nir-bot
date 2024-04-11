export class SystemService {
  static SYSTEMS = [
    {
      title: 'Nginx, Node.js, Express (полином)',
      description: 'Ubuntu, 1 core CPU, 2 GB RAM, Nginx, Node.js, Express',
      func: (x) => {
        const kof = [562.5748478023, -17.52689002188, 1.1689307918, -0.0106339103, 0.0000290553]
        return kof.reduce((acc, k, i) => acc + (k * (x ** i)), 0);
      }
    }, {
      title: 'Nginx, Node.js, Express (полином + линейный)',
      description: 'Ubuntu, 1 core CPU, 2 GB RAM, Nginx, Node.js, Express',
      func: (x) => {
        const kof = [562.5748478023, -17.52689002188, 1.1689307918, -0.0106339103, 0.0000290553];
        const f = (x) => kof.reduce((acc, k, i) => acc + (k * (x ** i)), 0);
        if (x < 10) {
          return f(10);
        } else if (x > 50) {
          return (f(50) / 50) * x;
        }
        return f(x);
      }
    }
  ];

  static getSystem (index) {
    return SystemService.SYSTEMS[index];
  }
};