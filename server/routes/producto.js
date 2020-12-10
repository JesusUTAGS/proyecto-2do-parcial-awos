const express = require('express');
const _ = require('underscore');
const app = express();
const Producto = require('../models/producto');

app.get('/producto/:id', function(req, res)  {
    
    let idProducto = req.params.id;

    Producto.findById({_id: idProducto})
    .populate('categoria', 'descripcion usuario')
    .exec((err, productos) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar las productos',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Productos listadas con exito',
            conteo: productos.length,
            productos
        });
    });
});

app.get('/producto/:id', (req, res) => {
    let idprod = req.params.id;
    Producto.findById({_id: idprod})
    .populate('categoria', 'descripcion usuario')
    .exec((err, productos) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar las productos',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Productos listadas con exito',
            productos
        });
    });
});

app.post('/producto', (req, res) =>{
    let pro = new Producto({
        _id: req.body._id,
        nombre: req.body.nombre,
        preciouni: req.body.preciouni,
        categoria: req.body.categoria,
    });

    pro.save((err, proDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un producto',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            proDB
        });
    });
});

app.put('/producto/:id', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body,['nombre','preciouni','categoria']);

    Producto.findByIdAndUpdate(id, body, { new:true, runValidators: true, context: 'query' }, (err, prodDB) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al actualizar',
                err
            });
        }

        res.json({
            ok:true,
            msg: 'Producto actualizado con exito',
            productos: prodDB
        });
    });
  });

  app.delete('/producto/:id', function (req, res) {
    let id = req.params.id;

     Producto.deleteOne({ _id: id }, (err, productoBorrado) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al intentar de eliminar el producto',
               err
           });
       }

       res.json({
           ok: true,
           msg: 'Producto eliminado con exito',
           productoBorrado
       });
    });
});

    

module.exports = app;