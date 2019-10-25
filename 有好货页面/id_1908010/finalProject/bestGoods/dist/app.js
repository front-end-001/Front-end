/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "085d74dc2e8726832405";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.js")(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apis/FetchApi.js":
/*!**************************!*\
  !*** ./apis/FetchApi.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); }\n\nfunction _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === \"[object Arguments]\")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n// import 'babel-polyfill' // bug regeneratorRuntime is not defined\nfunction loadScript(src) {\n  return new Promise(function (resolve, reject) {\n    var scriptElement = document.createElement('script');\n    scriptElement.src = src;\n    scriptElement.addEventListener('load', resolve);\n    document.documentElement.appendChild(scriptElement);\n  });\n}\n\nfunction happen(object, type, config) {\n  return new Promise(function (resolve, reject) {\n    object.addEventListener(type, resolve, config);\n  });\n}\n/* happen(document, \"DOMContentLoaded\").then(() => {\n    console.log(document.body)\n}) \n\nfetch(\"./data.json\").then(response => response.json()).then(obj => {\n    console.log(obj)\n}) \n*/\n\n/*Promise.all([\n    happen(document, \"DOMContentLoaded\"),\n    fetch(\"./data.json\").then(response => response.json())\n]).then(results => {\n    console.log(results)\n})\n*/\n//设计IIFE的技巧，如果使用括号（）来做，\n\n\nvoid _asyncToGenerator(\n/*#__PURE__*/\nregeneratorRuntime.mark(function _callee2() {\n  var _ref2, _ref3, obj, event;\n\n  return regeneratorRuntime.wrap(function _callee2$(_context2) {\n    while (1) {\n      switch (_context2.prev = _context2.next) {\n        case 0:\n          _context2.next = 2;\n          return Promise.all([_asyncToGenerator(\n          /*#__PURE__*/\n          regeneratorRuntime.mark(function _callee() {\n            return regeneratorRuntime.wrap(function _callee$(_context) {\n              while (1) {\n                switch (_context.prev = _context.next) {\n                  case 0:\n                    _context.next = 2;\n                    return fetch('./data.json');\n\n                  case 2:\n                    return _context.abrupt(\"return\", _context.sent.json());\n\n                  case 3:\n                  case \"end\":\n                    return _context.stop();\n                }\n              }\n            }, _callee);\n          }))(), //fetch(\"./data.json\").then(res => res.json()), //这里写await是为了先得到response\n          happen(document, \"DOMContentLoaded\"), loadScript('./main.js')]);\n\n        case 2:\n          _ref2 = _context2.sent;\n          _ref3 = _slicedToArray(_ref2, 2);\n          obj = _ref3[0];\n          event = _ref3[1];\n          window.render(obj, document.body); // console.log(obj, event)\n\n        case 7:\n        case \"end\":\n          return _context2.stop();\n      }\n    }\n  }, _callee2);\n}))();\n\n//# sourceURL=webpack:///./apis/FetchApi.js?");

/***/ }),

/***/ "./apis/LoadScript.js":
/*!****************************!*\
  !*** ./apis/LoadScript.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./apis/LoadScript.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/create */ \"./lib/create.js\");\n/* harmony import */ var _src_TabView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/TabView.js */ \"./src/TabView.js\");\n/* harmony import */ var _src_ScrollView_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/ScrollView.js */ \"./src/ScrollView.js\");\n/* harmony import */ var _src_ListView_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/ListView.js */ \"./src/ListView.js\");\n/* harmony import */ var _src_Div_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./src/Div.js */ \"./src/Div.js\");\n/* harmony import */ var _src_Config_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./src/Config.scss */ \"./src/Config.scss\");\n/* harmony import */ var _src_Config_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_src_Config_scss__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _src_Config_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./src/Config.js */ \"./src/Config.js\");\n/* harmony import */ var _src_Config_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_src_Config_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _apis_FetchApi_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./apis/FetchApi.js */ \"./apis/FetchApi.js\");\n/* harmony import */ var _apis_FetchApi_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_apis_FetchApi_js__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _apis_LoadScript_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./apis/LoadScript.js */ \"./apis/LoadScript.js\");\n/* harmony import */ var _apis_LoadScript_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_apis_LoadScript_js__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n // import \"./apis/XHRApi.js\"\n\n\n\n\nwindow.render = function () {\n  var test = Object(_lib_create__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(_src_TabView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    className: \"tabContainer\"\n  }, Object(_lib_create__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(_src_ScrollView_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    title: \"推荐\",\n    className: \"scroll\",\n    active: true\n  }, Object(_lib_create__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(_src_ListView_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null)), Object(_lib_create__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(_src_ScrollView_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    title: \"有趣的店\",\n    className: \"scroll\"\n  }), Object(_lib_create__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(_src_ScrollView_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    title: \"品牌新店\",\n    className: \"scroll\"\n  }), Object(_lib_create__WEBPACK_IMPORTED_MODULE_0__[\"create\"])(_src_ScrollView_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    title: \"发现\",\n    className: \"scroll\"\n  }));\n  test.appendTo(document.body);\n};\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./lib/consts.js":
/*!***********************!*\
  !*** ./lib/consts.js ***!
  \***********************/
/*! exports provided: PROPERTY_SYMBOL, ATTRIBUTE_SYMBOL, EVENT_SYMBOL, STATE_SYMBOL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PROPERTY_SYMBOL\", function() { return PROPERTY_SYMBOL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ATTRIBUTE_SYMBOL\", function() { return ATTRIBUTE_SYMBOL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EVENT_SYMBOL\", function() { return EVENT_SYMBOL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"STATE_SYMBOL\", function() { return STATE_SYMBOL; });\nvar PROPERTY_SYMBOL = Symbol('property');\nvar ATTRIBUTE_SYMBOL = Symbol('attribute');\nvar EVENT_SYMBOL = Symbol('event');\nvar STATE_SYMBOL = Symbol('state');\n\n//# sourceURL=webpack:///./lib/consts.js?");

/***/ }),

/***/ "./lib/create.js":
/*!***********************!*\
  !*** ./lib/create.js ***!
  \***********************/
/*! exports provided: create */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"create\", function() { return create; });\n/* harmony import */ var _src_TextView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/TextView */ \"./src/TextView.js\");\n\nfunction create(Class, attributes) {\n  var object = new Class();\n\n  for (var name in attributes) {\n    if (name.match(/^on-([\\s\\S]+)$/)) {\n      object.addEventListener(RegExp.$1, attributes[name]);\n    } else {\n      object.setAttribute(name, attributes[name]);\n    }\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n\n    if (typeof child == \"string\") {\n      console.log(child);\n      object.appendChild(new _src_TextView__WEBPACK_IMPORTED_MODULE_0__[\"default\"](child));\n    } else {\n      object.appendChild(child);\n    }\n  }\n\n  return object;\n}\n\n//# sourceURL=webpack:///./lib/create.js?");

/***/ }),

/***/ "./lib/gesture.js":
/*!************************!*\
  !*** ./lib/gesture.js ***!
  \************************/
/*! exports provided: enableGesture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"enableGesture\", function() { return enableGesture; });\nfunction enableGesture(main) {\n  var contexts = Object.create(null);\n\n  var start = function start(point, context, origin) {\n    context.startX = point.clientX;\n    context.startY = point.clientY;\n    context.startTime = Date.now();\n    context.isTap = true;\n    context.isPan = false;\n    context.pressHandler = setTimeout(function () {\n      var e = new Event(\"pressstart\");\n      e.origin = origin;\n      main.dispatchEvent(e);\n      context.isPress = true;\n      context.pressHandler = null;\n    }, 500); //console.log(\"start\",[point.clientX, point.clientY])\n  };\n\n  var move = function move(point, context, origin) {\n    //console.log(context.isPan);\n    if (Math.abs(point.clientX - context.startX) > 10 || Math.abs(point.clientY - context.startY) > 10) {\n      context.isTap = false;\n\n      if (context.isPan == false) {\n        context.isPan = true;\n\n        if (context.isPress) {\n          context.isPress = false;\n          var e = new Event(\"presscancel\");\n          main.dispatchEvent(e);\n        }\n\n        if (Math.abs(point.clientX - context.startX) < Math.abs(point.clientY - context.startY)) {\n          context.isVertical = true;\n        } else {\n          context.isVertical = false;\n        }\n\n        var e = new Event(\"panstart\");\n        e.origin = origin;\n        e.startX = context.startX;\n        e.startY = context.startY;\n        e.isVertical = context.isVertical;\n        main.dispatchEvent(e);\n        if (context.pressHandler) clearTimeout(context.pressHandler);\n      }\n    }\n\n    if (context.isPan) {\n      var e = new Event(\"pan\");\n      e.x = point.clientX;\n      e.y = point.clientY;\n      e.dx = point.clientX - context.startX;\n      e.dy = point.clientY - context.startY;\n      e.origin = origin;\n      e.isVertical = context.isVertical;\n      main.dispatchEvent(e);\n    } //console.log(\"move\",[point.clientX, point.clientY], context)\n\n  };\n\n  var end = function end(point, context, origin) {\n    if (Date.now() - context.startTime < 300 && context.isTap) {\n      var e = new Event(\"tap\");\n      main.dispatchEvent(e);\n    }\n\n    if (context.isPan) {\n      var isFlick = false;\n      var t = Date.now() - context.startTime;\n      var v = Math.sqrt(Math.pow(point.clientX - context.startX, 2) + Math.pow(point.clientY - context.startY, 2)) / t;\n\n      if (v > 0.3) {\n        isFlick = true;\n        var e = new Event(\"flick\");\n        e.vx = (point.clientX - context.startX) / t;\n        e.vy = (point.clientY - context.startY) / t;\n        main.dispatchEvent(e);\n      }\n\n      console.log(\"panend\");\n      var e = new Event(\"panend\");\n      e.x = point.clientX;\n      e.y = point.clientY;\n      e.dx = point.clientX - context.startX;\n      e.dy = point.clientY - context.startY;\n      e.vx = (point.clientX - context.startX) / t;\n      e.vy = (point.clientY - context.startY) / t;\n      e.origin = origin;\n      e.isFlick = isFlick;\n      e.isVertical = context.isVertical;\n      main.dispatchEvent(e);\n    }\n\n    if (context.isPress) {\n      var e = new Event(\"pressend\");\n      main.dispatchEvent(e);\n    }\n  };\n\n  var cancel = function cancel(point, context, origin) {//console.log(\"cancel\",[point.clientX, point.clientY])\n  };\n\n  var mousedown = function mousedown(event) {\n    document.addEventListener(\"mousemove\", mousemove);\n    document.addEventListener(\"mouseup\", mouseup);\n    contexts[\"\"] = {};\n    start(event, contexts[\"\"], event);\n  };\n\n  var mousemove = function mousemove(event) {\n    move(event, contexts[\"\"], event);\n  };\n\n  var mouseup = function mouseup(event) {\n    document.removeEventListener(\"mousemove\", mousemove);\n    document.removeEventListener(\"mouseup\", mouseup);\n    end(event, contexts[\"\"], event);\n    delete contexts[\"\"];\n  };\n\n  var touchstart = function touchstart(event) {\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = event.changedTouches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var touch = _step.value;\n        contexts[touch.identifier] = {};\n        start(touch, contexts[touch.identifier], event);\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n          _iterator[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n  };\n\n  var touchmove = function touchmove(event) {\n    //console.log(event.changedTouches);\n    var _iteratorNormalCompletion2 = true;\n    var _didIteratorError2 = false;\n    var _iteratorError2 = undefined;\n\n    try {\n      for (var _iterator2 = event.changedTouches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n        var touch = _step2.value;\n        move(touch, contexts[touch.identifier], event);\n      }\n    } catch (err) {\n      _didIteratorError2 = true;\n      _iteratorError2 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n          _iterator2[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError2) {\n          throw _iteratorError2;\n        }\n      }\n    }\n  };\n\n  var touchend = function touchend(event) {\n    var _iteratorNormalCompletion3 = true;\n    var _didIteratorError3 = false;\n    var _iteratorError3 = undefined;\n\n    try {\n      for (var _iterator3 = event.changedTouches[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n        var touch = _step3.value;\n        end(touch, contexts[touch.identifier], event);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _didIteratorError3 = true;\n      _iteratorError3 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion3 && _iterator3[\"return\"] != null) {\n          _iterator3[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError3) {\n          throw _iteratorError3;\n        }\n      }\n    }\n  };\n\n  var touchcancel = function touchcancel(event) {\n    var _iteratorNormalCompletion4 = true;\n    var _didIteratorError4 = false;\n    var _iteratorError4 = undefined;\n\n    try {\n      for (var _iterator4 = event.changedTouches[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {\n        var touch = _step4.value;\n        cancel(touch, contexts[touch.identifier], event);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _didIteratorError4 = true;\n      _iteratorError4 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion4 && _iterator4[\"return\"] != null) {\n          _iterator4[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError4) {\n          throw _iteratorError4;\n        }\n      }\n    }\n  };\n\n  main.addEventListener(\"mousedown\", mousedown);\n  main.addEventListener(\"touchstart\", touchstart);\n  main.addEventListener(\"touchmove\", touchmove);\n  main.addEventListener(\"touchend\", touchend);\n  main.addEventListener(\"touchcancel\", touchcancel);\n}\n\n//# sourceURL=webpack:///./lib/gesture.js?");

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar R = (typeof Reflect === \"undefined\" ? \"undefined\" : _typeof(Reflect)) === 'object' ? Reflect : null;\nvar ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {\n  return Function.prototype.apply.call(target, receiver, args);\n};\nvar ReflectOwnKeys;\n\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys;\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n};\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\n\nmodule.exports = EventEmitter; // Backwards-compat with node 0.10.x\n\nEventEmitter.EventEmitter = EventEmitter;\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\n\nvar defaultMaxListeners = 10;\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function get() {\n    return defaultMaxListeners;\n  },\n  set: function set(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function () {\n  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n}; // Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\n\n\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n\n  this._maxListeners = n;\n  return this;\n};\n\nfunction $getMaxListeners(that) {\n  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return $getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n\n  for (var i = 1; i < arguments.length; i++) {\n    args.push(arguments[i]);\n  }\n\n  var doError = type === 'error';\n  var events = this._events;\n  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.\n\n  if (doError) {\n    var er;\n    if (args.length > 0) er = args[0];\n\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    } // At least give some kind of context to the user\n\n\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n  if (handler === undefined) return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n\n    for (var i = 0; i < len; ++i) {\n      ReflectApply(listeners[i], this, args);\n    }\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + _typeof(listener));\n  }\n\n  events = target._events;\n\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n\n      events = target._events;\n    }\n\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    } // Check for listener leak\n\n\n    m = $getMaxListeners(target);\n\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true; // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n\n      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener = function prependListener(type, listener) {\n  return _addListener(this, type, listener, true);\n};\n\nfunction onceWrapper() {\n  var args = [];\n\n  for (var i = 0; i < arguments.length; i++) {\n    args.push(arguments[i]);\n  }\n\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    ReflectApply(this.listener, this.target, args);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = {\n    fired: false,\n    wrapFn: undefined,\n    target: target,\n    type: type,\n    listener: listener\n  };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + _typeof(listener));\n  }\n\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + _typeof(listener));\n  }\n\n  this.prependListener(type, _onceWrap(this, type, listener));\n  return this;\n}; // Emits a 'removeListener' event if and only if the listener was removed.\n\n\nEventEmitter.prototype.removeListener = function removeListener(type, listener) {\n  var list, events, position, i, originalListener;\n\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + _typeof(listener));\n  }\n\n  events = this._events;\n  if (events === undefined) return this;\n  list = events[type];\n  if (list === undefined) return this;\n\n  if (list === listener || list.listener === listener) {\n    if (--this._eventsCount === 0) this._events = Object.create(null);else {\n      delete events[type];\n      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);\n    }\n  } else if (typeof list !== 'function') {\n    position = -1;\n\n    for (i = list.length - 1; i >= 0; i--) {\n      if (list[i] === listener || list[i].listener === listener) {\n        originalListener = list[i].listener;\n        position = i;\n        break;\n      }\n    }\n\n    if (position < 0) return this;\n    if (position === 0) list.shift();else {\n      spliceOne(list, position);\n    }\n    if (list.length === 1) events[type] = list[0];\n    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);\n  }\n\n  return this;\n};\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {\n  var listeners, events, i;\n  events = this._events;\n  if (events === undefined) return this; // not listening for removeListener, no need to emit\n\n  if (events.removeListener === undefined) {\n    if (arguments.length === 0) {\n      this._events = Object.create(null);\n      this._eventsCount = 0;\n    } else if (events[type] !== undefined) {\n      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];\n    }\n\n    return this;\n  } // emit removeListener for all listeners on all events\n\n\n  if (arguments.length === 0) {\n    var keys = Object.keys(events);\n    var key;\n\n    for (i = 0; i < keys.length; ++i) {\n      key = keys[i];\n      if (key === 'removeListener') continue;\n      this.removeAllListeners(key);\n    }\n\n    this.removeAllListeners('removeListener');\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n    return this;\n  }\n\n  listeners = events[type];\n\n  if (typeof listeners === 'function') {\n    this.removeListener(type, listeners);\n  } else if (listeners !== undefined) {\n    // LIFO order\n    for (i = listeners.length - 1; i >= 0; i--) {\n      this.removeListener(type, listeners[i]);\n    }\n  }\n\n  return this;\n};\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n  if (events === undefined) return [];\n  var evlistener = events[type];\n  if (evlistener === undefined) return [];\n  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function (emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\n\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n\n  for (var i = 0; i < n; ++i) {\n    copy[i] = arr[i];\n  }\n\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++) {\n    list[index] = list[index + 1];\n  }\n\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n\n  return ret;\n}\n\n//# sourceURL=webpack:///./node_modules/events/events.js?");

/***/ }),

/***/ "./src/BaseComponent.js":
/*!******************************!*\
  !*** ./src/BaseComponent.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Component; });\n/* harmony import */ var _lib_consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/consts */ \"./lib/consts.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_1__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\nvar Component =\n/*#__PURE__*/\nfunction () {\n  function Component(config) {\n    _classCallCheck(this, Component);\n\n    this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"PROPERTY_SYMBOL\"]] = Object.create(null);\n    this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"ATTRIBUTE_SYMBOL\"]] = Object.create(null);\n    this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_SYMBOL\"]] = Object.create(null);\n    this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"STATE_SYMBOL\"]] = Object.create(null);\n    this.root = document.createElement('div');\n  }\n\n  _createClass(Component, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.didMounted();\n    }\n  }, {\n    key: \"didCreate\",\n    value: function didCreate() {}\n  }, {\n    key: \"didMounted\",\n    value: function didMounted() {}\n  }, {\n    key: \"didUnmounted\",\n    value: function didUnmounted() {}\n  }, {\n    key: \"didUpdate\",\n    value: function didUpdate() {}\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"ATTRIBUTE_SYMBOL\"]][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      return this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"ATTRIBUTE_SYMBOL\"]][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_SYMBOL\"]][type]) {\n        this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_SYMBOL\"]][type] = new Set();\n      }\n\n      this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_SYMBOL\"]][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_SYMBOL\"]][type]) {\n        throw new Error(\"no such event \".concat(type));\n      }\n\n      this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_SYMBOL\"]][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      var _this = this;\n\n      if (!this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_SYMBOL\"]][type]) return;\n      this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_SYMBOL\"]][type].forEach(function (event) {\n        event.call(_this);\n      });\n    }\n  }, {\n    key: \"property\",\n    get: function get() {\n      return this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"PROPERTY_SYMBOL\"]];\n    },\n    set: function set(value) {\n      this.property = value;\n    }\n  }, {\n    key: \"attrs\",\n    get: function get() {\n      return this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"ATTRIBUTE_SYMBOL\"]];\n    }\n  }, {\n    key: \"events\",\n    get: function get() {\n      return this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"EVENT_SYMBOL\"]];\n    }\n  }, {\n    key: \"state\",\n    get: function get() {\n      return this[_lib_consts__WEBPACK_IMPORTED_MODULE_0__[\"STATE_SYMBOL\"]];\n    }\n  }]);\n\n  return Component;\n}();\n\n\n\n//# sourceURL=webpack:///./src/BaseComponent.js?");

/***/ }),

/***/ "./src/Config.js":
/*!***********************!*\
  !*** ./src/Config.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//避免上下滚屏\ndocument.addEventListener(\"touchmove\", function (e) {\n  if (e.touches.length == 2) e.preventDefault();\n}, {\n  passive: false\n});\ndocument.addEventListener(\"touchmove\", function (e) {\n  if (e.touches.length == 1) e.preventDefault();\n}, {\n  passive: false\n}); // touchstart事件不能打开，不然headerItem不能点击\n// document.addEventListener(\"touchstart\",function(e){ \n//     e.preventDefault(); \n// }, {passive:false});\n\n//# sourceURL=webpack:///./src/Config.js?");

/***/ }),

/***/ "./src/Config.scss":
/*!*************************!*\
  !*** ./src/Config.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/Config.scss?");

/***/ }),

/***/ "./src/Div.js":
/*!********************!*\
  !*** ./src/Div.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Div; });\n/* harmony import */ var _BaseComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseComponent */ \"./src/BaseComponent.js\");\n/* harmony import */ var _Div_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Div.scss */ \"./src/Div.scss\");\n/* harmony import */ var _Div_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Div_scss__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar Div =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(Div, _Component);\n\n  function Div(config) {\n    var _this;\n\n    _classCallCheck(this, Div);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Div).call(this, config));\n    _this.property.children = [];\n\n    _this.didCreate();\n\n    return _this;\n  }\n\n  _createClass(Div, [{\n    key: \"didCreate\",\n    value: function didCreate() {}\n  }, {\n    key: \"didMounted\",\n    value: function didMounted() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      child.appendTo(this.root);\n    }\n  }]);\n\n  return Div;\n}(_BaseComponent__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/Div.js?");

/***/ }),

/***/ "./src/Div.scss":
/*!**********************!*\
  !*** ./src/Div.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/Div.scss?");

/***/ }),

/***/ "./src/ListView.js":
/*!*************************!*\
  !*** ./src/ListView.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ListView; });\n/* harmony import */ var _BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseComponent.js */ \"./src/BaseComponent.js\");\n/* harmony import */ var _ListView_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListView.scss */ \"./src/ListView.scss\");\n/* harmony import */ var _ListView_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ListView_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_create__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/create */ \"./lib/create.js\");\n/* harmony import */ var _Div_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Div.js */ \"./src/Div.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\nvar ListView =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(ListView, _Component);\n\n  function ListView(config) {\n    var _this;\n\n    _classCallCheck(this, ListView);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(ListView).call(this, config));\n    _this.property.children = [];\n\n    _this.didCreate();\n\n    return _this;\n  }\n\n  _createClass(ListView, [{\n    key: \"didCreate\",\n    value: function didCreate() {\n      var content = Object(_lib_create__WEBPACK_IMPORTED_MODULE_2__[\"create\"])(_Div_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null, Object(_lib_create__WEBPACK_IMPORTED_MODULE_2__[\"create\"])(_Div_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null, \"text\"));\n      content.appendTo(this.root);\n    }\n  }]);\n\n  return ListView;\n}(_BaseComponent_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/ListView.js?");

/***/ }),

/***/ "./src/ListView.scss":
/*!***************************!*\
  !*** ./src/ListView.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/ListView.scss?");

/***/ }),

/***/ "./src/ScrollView.js":
/*!***************************!*\
  !*** ./src/ScrollView.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ScrollView; });\n/* harmony import */ var _BaseComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseComponent */ \"./src/BaseComponent.js\");\n/* harmony import */ var _ScrollView_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScrollView.scss */ \"./src/ScrollView.scss\");\n/* harmony import */ var _ScrollView_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ScrollView_scss__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar ScrollView =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(ScrollView, _Component);\n\n  function ScrollView(config) {\n    var _this;\n\n    _classCallCheck(this, ScrollView);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(ScrollView).call(this, config));\n    _this.property.children = [];\n\n    _this.didCreate();\n\n    return _this;\n  }\n\n  _createClass(ScrollView, [{\n    key: \"didCreate\",\n    value: function didCreate() {\n      //阻止滑动事件向上传播\n      this.root.addEventListener('touchmove', function (event) {\n        event.cancelBubble = true;\n        event.stopImmediatePropagation();\n      }, {\n        passive: false\n      });\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      child.appendTo(this.root);\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == 'className') {\n        this.root.className = value;\n      }\n\n      return this.attrs[name] = value;\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == 'className') {\n        return this.root.className;\n      }\n\n      return this.attrs[name];\n    }\n  }]);\n\n  return ScrollView;\n}(_BaseComponent__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/ScrollView.js?");

/***/ }),

/***/ "./src/ScrollView.scss":
/*!*****************************!*\
  !*** ./src/ScrollView.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/ScrollView.scss?");

/***/ }),

/***/ "./src/TabView.js":
/*!************************!*\
  !*** ./src/TabView.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TabView; });\n/* harmony import */ var _BaseComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseComponent */ \"./src/BaseComponent.js\");\n/* harmony import */ var _TabView_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TabView.scss */ \"./src/TabView.scss\");\n/* harmony import */ var _TabView_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_TabView_scss__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_gesture_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/gesture.js */ \"./lib/gesture.js\");\n/* harmony import */ var _lib_consts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/consts */ \"./lib/consts.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\nvar TabView =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(TabView, _Component);\n\n  function TabView(config) {\n    var _this;\n\n    _classCallCheck(this, TabView);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(TabView).call(this, config));\n    _this.property.children = [];\n    _this.property.headers = [];\n\n    _this.didCreate();\n\n    return _this;\n  }\n\n  _createClass(TabView, [{\n    key: \"didCreate\",\n    value: function didCreate() {\n      var _this2 = this;\n\n      this.headerContainer = document.createElement('div');\n      this.headerContainer.className = 'headerContainer';\n      this.contentContainer = document.createElement('div');\n      this.contentContainer.className = 'contentContainer';\n      this.root.appendChild(this.headerContainer);\n      this.root.appendChild(this.contentContainer);\n      Object(_lib_gesture_js__WEBPACK_IMPORTED_MODULE_2__[\"enableGesture\"])(this.contentContainer);\n      this.state.position = 0;\n      this.contentContainer.addEventListener('pan', function (event) {\n        event.origin.preventDefault();\n        console.log(\"pan\");\n\n        var contentWidth = _this2.contentContainer.getBoundingClientRect().width; // --> 边界阻力效果\n\n\n        var dx = event.dx;\n\n        if (_this2.state.position == 0 && event.dx > 0) {\n          dx = dx / 2;\n        }\n\n        if (_this2.state.position == _this2.contentContainer.children.length - 1 && event.dx < 0) {\n          dx = dx / 2;\n        } // <-- 边界阻力效果\n\n\n        for (var i = 0; i < _this2.contentContainer.children.length; i++) {\n          _this2.contentContainer.children[i].style.transition = 'transform ease 0.5s';\n          var originOffset = contentWidth * _this2.state.position; //起始位置\n\n          _this2.contentContainer.children[i].style.transform = \"translateX(\".concat(dx - originOffset, \"px)\");\n        }\n      });\n      this.contentContainer.addEventListener('panend', function (event) {\n        event.origin.preventDefault();\n        console.log(\"panend\");\n        var isLeft;\n\n        var contentWidth = _this2.contentContainer.getBoundingClientRect().width;\n\n        if (event.isFlick) {\n          if (event.vx > 0) {\n            _this2.state.position--;\n            isLeft = true;\n          }\n\n          if (event.vx < 0) {\n            _this2.state.position++;\n            isLeft = false;\n          }\n        } else {\n          if (event.dx > contentWidth / 2) {\n            _this2.state.position--;\n            isLeft = true;\n          } else if (event.dx < -contentWidth / 2) {\n            _this2.state.position++;\n            isLeft = false;\n          } else if (event.dx > 0) {\n            isLeft = false;\n          } else {\n            isLeft = true;\n          }\n        }\n\n        if (_this2.state.position < 0) {\n          _this2.state.position = 0;\n        }\n\n        if (_this2.state.position >= _this2.contentContainer.children.length) {\n          _this2.state.position = _this2.contentContainer.children.length - 1;\n        }\n\n        for (var i = 0; i < _this2.contentContainer.children.length; i++) {\n          _this2.contentContainer.children[i].style.transition = 'transform ease 0.5s';\n          var originOffset = contentWidth * _this2.state.position;\n          _this2.contentContainer.children[i].style.transform = \"translateX(\".concat(-originOffset, \"px)\");\n        } // update headerItem index\n\n\n        for (var _i = 0; _i < _this2.headerContainer.children.length; _i++) {\n          if (_this2.state.position == _i) {\n            _this2.headerContainer.children[_i].className = \"headerItem active\";\n            _this2.headerContainer.children[_i].children[0].style.display = \"block\";\n          } else {\n            _this2.headerContainer.children[_i].className = \"headerItem\";\n            _this2.headerContainer.children[_i].children[0].style.display = \"none\";\n          }\n        }\n      });\n    }\n  }, {\n    key: \"didMounted\",\n    value: function didMounted() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      var _this3 = this;\n\n      var n = this.children.length;\n      this.children.push(child);\n      var title = child.getAttribute('title') || \"\";\n      this.property.headers.push(title);\n      var headerItem = document.createElement('div');\n      headerItem.innerText = title;\n      headerItem.className = \"headerItem\";\n      var headerIndicator = document.createElement('div');\n      headerIndicator.className = \"headerIndicator\";\n      var defaultActive = child.getAttribute('active') || false;\n      headerIndicator.style.display = defaultActive ? \"block\" : 'none';\n      headerItem.appendChild(headerIndicator);\n      this.headerContainer.appendChild(headerItem);\n      headerItem.addEventListener(\"click\", function (event) {\n        _this3.state.position = n;\n\n        var idx = _this3.property.headers.indexOf(headerItem.innerText);\n\n        for (var i = 0; i < _this3.headerContainer.children.length; i++) {\n          if (idx == i) {\n            _this3.headerContainer.children[i].className = \"headerItem active\";\n            _this3.headerContainer.children[i].children[0].style.display = \"block\";\n          } else {\n            _this3.headerContainer.children[i].className = \"headerItem\";\n            _this3.headerContainer.children[i].children[0].style.display = \"none\";\n          }\n        }\n\n        for (var _i2 = 0; _i2 < _this3.contentContainer.children.length; _i2++) {\n          _this3.contentContainer.children[_i2].style.transform = \"translateX(\".concat(-n * 100, \"%)\");\n          _this3.contentContainer.children[_i2].style.transition = 'ease 0.5s';\n        }\n      });\n      child.appendTo(this.contentContainer);\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == 'className') {\n        this.root.className = value;\n      }\n\n      return this.attrs[name] = value;\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == 'className') {\n        return this.root.className;\n      }\n\n      return this.attrs[name];\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this.property.children;\n    }\n  }]);\n\n  return TabView;\n}(_BaseComponent__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/TabView.js?");

/***/ }),

/***/ "./src/TabView.scss":
/*!**************************!*\
  !*** ./src/TabView.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/TabView.scss?");

/***/ }),

/***/ "./src/TextView.js":
/*!*************************!*\
  !*** ./src/TextView.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TextView; });\n/* harmony import */ var _BaseComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseComponent */ \"./src/BaseComponent.js\");\n/* harmony import */ var _TextView_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextView.scss */ \"./src/TextView.scss\");\n/* harmony import */ var _TextView_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_TextView_scss__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\nvar TextView =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(TextView, _Component);\n\n  function TextView(config) {\n    var _this;\n\n    _classCallCheck(this, TextView);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextView).call(this, config));\n    _this.text = config || \"\";\n\n    _this.didCreate();\n\n    return _this;\n  }\n\n  _createClass(TextView, [{\n    key: \"didCreate\",\n    value: function didCreate() {\n      this.root = document.createElement('span');\n      this.root.classList += \"content\";\n      this.root.innerText = this.text;\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == 'className') {\n        this.root.className = value;\n      }\n\n      return this.attrs[name] = value;\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == 'className') {\n        return this.root.className;\n      }\n\n      return this.attrs[name];\n    }\n  }]);\n\n  return TextView;\n}(_BaseComponent__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n\n//# sourceURL=webpack:///./src/TextView.js?");

/***/ }),

/***/ "./src/TextView.scss":
/*!***************************!*\
  !*** ./src/TextView.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/TextView.scss?");

/***/ })

/******/ });