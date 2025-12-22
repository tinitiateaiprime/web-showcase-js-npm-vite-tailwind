import React, { useState, useRef, useCallback } from 'react';
import { 
  Square, Circle, Triangle, Diamond, Hexagon, Star, Plus, ZoomIn, ZoomOut, 
  RotateCcw, Move, Hand, MousePointer, Menu, FileText, Edit, Eye, 
  AlignCenter, Palette, HelpCircle, Save, FolderOpen, Printer, Copy,
  Scissors, Undo, Redo, ArrowRight, ArrowLeft, ArrowUp, ArrowDown,
  Minus, X, Home, Database, Layers, Grid, Settings, Upload, Download,
  Trash2, RefreshCw, Users, Cloud, Lock, Heart, Flag, Bell, Mail,
  Phone, Calendar, Clock, MapPin, Image, Video, Music, Bookmark
} from 'lucide-react';

const EnhancedDiagramBuilder = () => {
  const [elements, setElements] = useState([]);
  const [draggedElement, setDraggedElement] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [selectedTool, setSelectedTool] = useState('pointer');
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('basic');
  const canvasRef = useRef(null);

  const shapeCategories = {
    basic: {
      title: 'Basic Shapes',
      shapes: {
        rectangle: { icon: Square, color: 'bg-blue-500', render: 'rect' },
        circle: { icon: Circle, color: 'bg-green-500', render: 'circle' },
        triangle: { icon: Triangle, color: 'bg-red-500', render: 'triangle' },
        diamond: { icon: Diamond, color: 'bg-purple-500', render: 'diamond' },
        hexagon: { icon: Hexagon, color: 'bg-orange-500', render: 'hexagon' },
        star: { icon: Star, color: 'bg-pink-500', render: 'star' }
      }
    },
    arrows: {
      title: 'Arrows',
      shapes: {
        arrowRight: { icon: ArrowRight, color: 'bg-indigo-500', render: 'arrow' },
        arrowLeft: { icon: ArrowLeft, color: 'bg-indigo-500', render: 'arrow' },
        arrowUp: { icon: ArrowUp, color: 'bg-indigo-500', render: 'arrow' },
        arrowDown: { icon: ArrowDown, color: 'bg-indigo-500', render: 'arrow' }
      }
    },
    symbols: {
      title: 'Symbols',
      shapes: {
        plus: { icon: Plus, color: 'bg-teal-500', render: 'icon' },
        minus: { icon: Minus, color: 'bg-teal-500', render: 'icon' },
        x: { icon: X, color: 'bg-red-600', render: 'icon' },
        home: { icon: Home, color: 'bg-blue-600', render: 'icon' },
        database: { icon: Database, color: 'bg-gray-600', render: 'icon' },
        layers: { icon: Layers, color: 'bg-purple-600', render: 'icon' },
        grid: { icon: Grid, color: 'bg-gray-500', render: 'icon' },
        settings: { icon: Settings, color: 'bg-slate-600', render: 'icon' }
      }
    },
    business: {
      title: 'Business',
      shapes: {
        users: { icon: Users, color: 'bg-emerald-500', render: 'icon' },
        cloud: { icon: Cloud, color: 'bg-sky-500', render: 'icon' },
        lock: { icon: Lock, color: 'bg-yellow-600', render: 'icon' },
        upload: { icon: Upload, color: 'bg-green-600', render: 'icon' },
        download: { icon: Download, color: 'bg-blue-600', render: 'icon' },
        calendar: { icon: Calendar, color: 'bg-red-500', render: 'icon' },
        clock: { icon: Clock, color: 'bg-orange-600', render: 'icon' },
        mail: { icon: Mail, color: 'bg-blue-500', render: 'icon' }
      }
    },
    misc: {
      title: 'Miscellaneous',
      shapes: {
        heart: { icon: Heart, color: 'bg-red-500', render: 'icon' },
        flag: { icon: Flag, color: 'bg-green-500', render: 'icon' },
        bell: { icon: Bell, color: 'bg-yellow-500', render: 'icon' },
        phone: { icon: Phone, color: 'bg-green-600', render: 'icon' },
        mapPin: { icon: MapPin, color: 'bg-red-600', render: 'icon' },
        image: { icon: Image, color: 'bg-purple-500', render: 'icon' },
        video: { icon: Video, color: 'bg-indigo-600', render: 'icon' },
        music: { icon: Music, color: 'bg-pink-500', render: 'icon' }
      }
    }
  };

  const menuItems = [
    { id: 'file', label: 'File', icon: FileText },
    { id: 'edit', label: 'Edit', icon: Edit },
    { id: 'view', label: 'View', icon: Eye },
    { id: 'arrange', label: 'Arrange', icon: AlignCenter },
    { id: 'extras', label: 'Extras', icon: Palette },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ];

  const menuDropdowns = {
    file: [
      { label: 'New', icon: FileText, action: () => clearCanvas() },
      { label: 'Open', icon: FolderOpen, action: () => {} },
      { label: 'Save', icon: Save, action: () => {} },
      { label: 'Print', icon: Printer, action: () => {} }
    ],
    edit: [
      { label: 'Undo', icon: Undo, action: () => {} },
      { label: 'Redo', icon: Redo, action: () => {} },
      { label: 'Cut', icon: Scissors, action: () => {} },
      { label: 'Copy', icon: Copy, action: () => {} },
      { label: 'Delete', icon: Trash2, action: () => {} }
    ],
    view: [
      { label: 'Zoom In', icon: ZoomIn, action: handleZoomIn },
      { label: 'Zoom Out', icon: ZoomOut, action: handleZoomOut },
      { label: 'Reset View', icon: RefreshCw, action: handleZoomReset },
      { label: 'Grid', icon: Grid, action: () => {} }
    ],
    arrange: [
      { label: 'Bring to Front', icon: ArrowUp, action: () => {} },
      { label: 'Send to Back', icon: ArrowDown, action: () => {} },
      { label: 'Align Left', icon: AlignCenter, action: () => {} },
      { label: 'Align Center', icon: AlignCenter, action: () => {} }
    ],
    extras: [
      { label: 'Themes', icon: Palette, action: () => {} },
      { label: 'Export', icon: Download, action: () => {} },
      { label: 'Import', icon: Upload, action: () => {} }
    ],
    help: [
      { label: 'Documentation', icon: HelpCircle, action: () => {} },
      { label: 'Shortcuts', icon: HelpCircle, action: () => {} },
      { label: 'About', icon: HelpCircle, action: () => {} }
    ]
  };

  const tools = [
    { id: 'pointer', icon: MousePointer, name: 'Select' },
    { id: 'hand', icon: Hand, name: 'Pan' },
    { id: 'move', icon: Move, name: 'Move' }
  ];

  function handleZoomIn() {
    setZoom(prev => Math.min(prev * 1.2, 3));
  }

  function handleZoomOut() {
    setZoom(prev => Math.max(prev / 1.2, 0.2));
  }

  function handleZoomReset() {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }

  const handleMenuClick = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  const handleToolSelect = (toolId) => {
    setSelectedTool(toolId);
    setActiveMenu(null);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleDragStart = (e, shapeType) => {
    e.dataTransfer.setData('shapeType', shapeType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleCanvasDrop = (e) => {
    e.preventDefault();
    const shapeType = e.dataTransfer.getData('shapeType');
    
    if (shapeType) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const newElement = {
        id: Date.now(),
        type: shapeType,
        x: (e.clientX - canvasRect.left - panOffset.x) / zoom - 30,
        y: (e.clientY - canvasRect.top - panOffset.y) / zoom - 30,
        width: 60,
        height: 60,
        category: Object.keys(shapeCategories).find(cat => 
          shapeCategories[cat].shapes[shapeType]
        )
      };
      setElements(prev => [...prev, newElement]);
    }
  };

  const handleCanvasDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleElementMouseDown = (e, elementId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (selectedTool !== 'pointer') return;
    
    const element = elements.find(el => el.id === elementId);
    const rect = e.currentTarget.getBoundingClientRect();
    
    setDraggedElement(elementId);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleCanvasMouseDown = (e) => {
    setActiveMenu(null);
    if (selectedTool === 'hand') {
      setIsPanning(true);
      setPanStart({
        x: e.clientX - panOffset.x,
        y: e.clientY - panOffset.y
      });
    }
  };

  const handleMouseMove = useCallback((e) => {
    if (draggedElement && selectedTool === 'pointer') {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const newX = (e.clientX - canvasRect.left - panOffset.x) / zoom - dragOffset.x;
      const newY = (e.clientY - canvasRect.top - panOffset.y) / zoom - dragOffset.y;
      
      setElements(prev => 
        prev.map(el => 
          el.id === draggedElement 
            ? { ...el, x: newX, y: newY }
            : el
        )
      );
    } else if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  }, [draggedElement, dragOffset, isPanning, panStart, zoom, panOffset, selectedTool]);

  const handleMouseUp = useCallback(() => {
    setDraggedElement(null);
    setDragOffset({ x: 0, y: 0 });
    setIsPanning(false);
  }, []);

  React.useEffect(() => {
    if (draggedElement || isPanning) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [draggedElement, isPanning, handleMouseMove, handleMouseUp]);

  const deleteElement = (elementId) => {
    setElements(prev => prev.filter(el => el.id !== elementId));
  };

  const clearCanvas = () => {
    setElements([]);
    setActiveMenu(null);
  };

  const renderShape = (element) => {
    const category = shapeCategories[element.category];
    const shape = category?.shapes[element.type];
    
    if (!shape) return null;
    
    const ShapeIcon = shape.icon;
    const shapeColor = shape.color;
    
    return (
      <div
        key={element.id}
        className={`absolute cursor-move ${shapeColor} rounded-lg shadow-lg border-2 border-white hover:border-gray-300 transition-all duration-200 flex items-center justify-center`}
        style={{
          left: element.x * zoom,
          top: element.y * zoom,
          width: element.width * zoom,
          height: element.height * zoom
        }}
        onMouseDown={(e) => handleElementMouseDown(e, element.id)}
        onDoubleClick={() => deleteElement(element.id)}
      >
        <ShapeIcon className="text-white" size={Math.min(24 * zoom, 32)} />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Menu Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center px-4 py-2">
          <div className="flex items-center space-x-6">
            {menuItems.map(item => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                    activeMenu === item.id 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={14} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
                
                {activeMenu === item.id && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {menuDropdowns[item.id].map((menuItem, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          menuItem.action();
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <menuItem.icon size={14} />
                        <span>{menuItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Shape Library</h2>
            <div className="flex flex-wrap gap-2">
              {Object.entries(shapeCategories).map(([categoryId, category]) => (
                <button
                  key={categoryId}
                  onClick={() => handleCategorySelect(categoryId)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    selectedCategory === categoryId
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(shapeCategories[selectedCategory].shapes).map(([type, { icon: Icon, color }]) => (
                <div
                  key={type}
                  className={`${color} aspect-square rounded-lg cursor-grab active:cursor-grabbing hover:opacity-80 transition-opacity flex items-center justify-center shadow-md`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, type)}
                  title={type.charAt(0).toUpperCase() + type.slice(1)}
                >
                  <Icon className="text-white" size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-gray-800">Diagram Builder</h1>
                
                {/* Tool Selection */}
                <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                  {tools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => handleToolSelect(tool.id)}
                      className={`p-2 rounded-md transition-colors ${
                        selectedTool === tool.id 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                      title={tool.name}
                    >
                      <tool.icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Zoom Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>
                
                <span className="text-sm text-gray-600 min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                
                <button
                  onClick={handleZoomIn}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>
                
                <button
                  onClick={handleZoomReset}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Reset View"
                >
                  <RotateCcw size={16} />
                </button>
                
                <div className="text-sm text-gray-600 ml-4">
                  Elements: {elements.length}
                </div>
              </div>
            </div>
          </div>
          
          {/* Canvas */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={canvasRef}
              className={`w-full h-full relative bg-gray-50 overflow-hidden ${
                selectedTool === 'hand' ? 'cursor-grab' : 'cursor-default'
              } ${isPanning ? 'cursor-grabbing' : ''}`}
              onDrop={handleCanvasDrop}
              onDragOver={handleCanvasDragOver}
              onMouseDown={handleCanvasMouseDown}
              style={{
                backgroundImage: `
                  radial-gradient(circle, #d1d5db 1px, transparent 1px)
                `,
                backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
                backgroundPosition: `${panOffset.x}px ${panOffset.y}px`
              }}
            >
              <div
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
                  transformOrigin: '0 0'
                }}
              >
                {elements.map(renderShape)}
              </div>
              
              {/* Instructions */}
              {elements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-gray-500">
                    <Plus size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium mb-2">Drag shapes from the sidebar</p>
                    <p className="text-sm">Use tools: Select to move, Hand to pan</p>
                    <p className="text-sm">Double-click shapes to delete</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedDiagramBuilder;