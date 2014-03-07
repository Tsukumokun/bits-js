//
// MODULES-JS: PATTERN: mvc.Model & mvc.View & mvc.Controller
// Copyright (C) 2014 Christopher Kelley   <tsukumokun(at)icloud.com>
//                    Till Smejkal         <till.smejkal(at)gmail.com>
//
// This work is licensed under the 
// Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 
// International License. To view a copy of this license, visit 
// http://creativecommons.org/licenses/by-nc-nd/4.0/deed.en_US.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
//

package pattern

import [./]observer.js
import [./../lang]error.js

/**
 * mvc namespace for model-view-controller pattern.
 * http://en.wikipedia.org/wiki/Model-view-controller
 *
 * @namespace pattern.mvc
 */
pattern.mvc = { }

/**
 * @class pattern.mvc.Model
 *
 * Model is the base implementation for the
 * model portion of a model-view-controller.
 *
 * @namespace pattern.mvc
 * @param {Object} controller pattern.mvc.Controller
 */
pattern.mvc.Model = function ( controller )
{
    if ( ! (controller instanceof pattern.mvc.Controller) )
    {
        throw new lang.InvalidArgumentException('expected controller');
    }

    this.controller = controller;

    this.controller.item_add_observer.attach(this.item_add_notify);
    this.controller.item_del_observer.attach(this.item_del_notify);
    this.controller.item_upd_observer.attach(this.item_upd_notify);

    this.item_add_observer = new pattern.Observable(this);
    this.item_del_observer = new pattern.Observable(this);
    this.item_upd_observer = new pattern.Observable(this);
}

/**
 * Called when the model has been notified
 * that an item should be added.
 *
 * @param {Object} sender what sent the notification
 * @param {Object} args contents of the notification
 */
pattern.mvc.Model.prototype.item_add_notify = function ( sender, args )
{
    if ( ! (sender instanceof pattern.mvc.Controller) )
    {
        throw new lang.InvalidArgumentException('sender not a controller');
    }
    this.item_add(args.item);
}
/**
 * Called when the model has been notified
 * that an item should be deleted.
 *
 * @param {Object} sender what sent the notification
 * @param {Object} args contents of the notification
 */
pattern.mvc.Model.prototype.item_del_notify = function ( sender, args )
{
    if ( ! (sender instanceof pattern.mvc.Controller) )
    {
        throw new lang.InvalidArgumentException('sender not a controller');
    }
    this.item_delete(args.item);
}
/**
 * Called when the model has been notified
 * that an item should be updated.
 *
 * @param {Object} sender what sent the notification
 * @param {Object} args contents of the notification
 */
pattern.mvc.Model.prototype.item_upd_notify = function ( sender, args )
{
    if ( ! (sender instanceof pattern.mvc.Controller) )
    {
        throw new lang.InvalidArgumentException('sender not a controller');
    }
    this.item_update(args.item);
}
/**
 * Called to add an item to the model which
 * will then update the view.
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.Model.prototype.item_add = function ( item )
{
    this.item_add_observer.notify({item:item});
    this.item_added(item);
}
/**
 * Called to remove an item from the model which
 * will then update the view.
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.Model.prototype.item_delete = function ( item )
{
    this.item_del_observer.notify({item:item});
    this.item_deleted(item);
}
/**
 * Called to update an item in the model which
 * will then update the view.
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.Model.prototype.item_update = function ( item )
{
    this.item_upd_observer.notify({item:item});
    this.item_updated(item);
}

/**
 * Called when an item has been added to the model.
 *
 * NOTE: This must be overrided!
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.Model.prototype.item_added = function ( item )
{
    throw new lang.NotImplementedError('pattern.mvc.Model.prototype.item_added');
}
/**
 * Called when an item has been removed from the model.
 *
 * NOTE: This must be overrided!
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.Model.prototype.item_deleted = function ( item )
{
    throw new lang.NotImplementedError('pattern.mvc.Model.prototype.item_deleted');
}
/**
 * Called when an item has been updated in the model.
 *
 * NOTE: This must be overrided!
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.Model.prototype.item_updated = function ( item )
{
    throw new lang.NotImplementedError('pattern.mvc.Model.prototype.item_updated');
}

/**
 * @class pattern.mvc.View
 *
 * View is the base implementation for the
 * view portion of a model-view-controller.
 *
 * @namespace pattern.mvc
 * @param {Object} model pattern.mvc.Model
 */
pattern.mvc.View = function ( model )
{
    if ( ! (model instanceof pattern.mvc.Model) )
    {
        throw new lang.InvalidArgumentException('expected model');
    }

    this.model = model;

    this.model.item_add_observer.attach(this.item_add_notify);
    this.model.item_del_observer.attach(this.item_del_notify);
    this.model.item_upd_observer.attach(this.item_upd_notify);
}

/**
 * Called when the view has been notified
 * that an item should be added.
 *
 * @param {Object} sender what sent the notification
 * @param {Object} args contents of the notification
 */
pattern.mvc.View.prototype.item_add_notify = function ( sender, args )
{
    if ( ! (sender instanceof pattern.mvc.Model) )
    {
        throw new lang.InvalidArgumentException('sender not a model');
    }
    this.item_added(args.item);
}
/**
 * Called when the view has been notified
 * that an item should be removed.
 *
 * @param {Object} sender what sent the notification
 * @param {Object} args contents of the notification
 */
pattern.mvc.View.prototype.item_del_notify = function ( sender, args )
{
    if ( ! (sender instanceof pattern.mvc.Model) )
    {
        throw new lang.InvalidArgumentException('sender not a model');
    }
    this.item_deleted(args.item);
}
/**
 * Called when the view has been notified
 * that an item should be updated.
 *
 * @param {Object} sender what sent the notification
 * @param {Object} args contents of the notification
 */
pattern.mvc.View.prototype.item_upd_notify = function ( sender, args )
{
    if ( ! (sender instanceof pattern.mvc.Model) )
    {
        throw new lang.InvalidArgumentException('sender not a model');
    }
    this.item_updated(args.item);
}

/**
 * Called when an item has been added to the model.
 *
 * NOTE: This must be overrided!
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.View.prototype.item_added = function ( item )
{
    throw new lang.NotImplementedError('pattern.mvc.View.prototype.item_added');
}
/**
 * Called when an item has been removed from the model.
 *
 * NOTE: This must be overrided!
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.View.prototype.item_deleted = function ( item )
{
    throw new lang.NotImplementedError('pattern.mvc.View.prototype.item_deleted');
}
/**
 * Called when an item has been updated in the model.
 *
 * NOTE: This must be overrided!
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.View.prototype.item_updated = function ( item )
{
    throw new lang.NotImplementedError('pattern.mvc.View.prototype.item_updated');
}

/**
 * @class pattern.mvc.Controller
 *
 * Controller is the base implementation for the
 * Controller portion of a model-view-controller.
 *
 * @namespace pattern.mvc
 */
pattern.mvc.Controller = function ()
{
    this.item_add_observer = new pattern.Observable(this);
    this.item_del_observer = new pattern.Observable(this);
    this.item_upd_observer = new pattern.Observable(this);
}

/**
 * Called to add an item to the model which
 * will then update the view.
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.Controller.prototype.item_add = function ( item )
{
    this.item_add_observer.notify({item:item});
}
/**
 * Called to remove an item from the model which
 * will then update the view.
 *
 * @param {Object} item what is being referenced
 */
pattern.mvc.Controller.prototype.item_delete = function ( item )
{
    this.item_del_observer.notify({item:item});
}
/**
 * Called when the model has been notified
 * that an item should be updated.
 *
 * @param {Object} sender what sent the notification
 * @param {Object} args contents of the notification
 */
pattern.mvc.Controller.prototype.item_update = function ( item )
{
    this.item_upd_observer.notify({item:item});
}