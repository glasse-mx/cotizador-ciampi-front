import { useState } from "react"


export const InventorySidebar = ({ categories, onSelect, activeCategory }) => {

    const parents = categories.filter(category => category.parent === 0 && category.slug !== 'sin-categorizar')

    const getChilds = (parent) => {
        return categories.filter(category => category.parent === parent.id)
    }

    const [activeParent, setActiveParent] = useState(0)
    const [activeChild, setActiveChild] = useState(0)

    const handleActiveParent = (e) => {
        e.target.dataset.cat && setActiveParent(e.target.dataset.cat)
    }

    const handleActiveChild = (e) => {
        onSelect(e)
        e.target.value && setActiveChild(e.target.value)
    }

    return (
        <div className="inventorySidebar">
            {
                parents.map((parent) => (
                    <>
                        <div key={parent.id} className={`category__box parent_cat ${parent.id == activeParent && 'opened'}`}
                            onClick={handleActiveParent} >
                            <h5 data-cat={parent.id}>{`${parent.name} (${parent.count})`}</h5>
                            <div className="category_child">
                                {
                                    getChilds(parent).map((child) => (
                                        <>
                                            <div key={child.id} className={`category__box child_cat ${child.id == activeChild && 'opened'}`}
                                            >
                                                <label className='flex'>
                                                    <input
                                                        type="radio"
                                                        name={child.slug}
                                                        id={child.id}
                                                        onChange={handleActiveChild}
                                                        value={child.id}
                                                        checked={child.id == activeCategory ? true : false}
                                                    />
                                                    <h6>{`${child.name} (${child.count})`}</h6>
                                                </label>
                                                {
                                                    (getChilds(child).length > 0) && (
                                                        <>
                                                            <div key={child.id} className={`category_grandchild`}>
                                                                {
                                                                    getChilds(child).map((grandchild) => (
                                                                        <>
                                                                            <div key={grandchild.id} className={`category__box grandchild_cat ${grandchild.id == activeChild && 'opened'}`}>
                                                                                <label>
                                                                                    <input
                                                                                        type="radio"
                                                                                        name={grandchild.name}
                                                                                        id={grandchild.id}
                                                                                        value={grandchild.id}
                                                                                        onChange={onSelect}
                                                                                        checked={grandchild.id == activeCategory ? true : false}
                                                                                    />
                                                                                    <span data-cat={grandchild.id}>{`${grandchild.name} (${grandchild.count})`}</span>
                                                                                </label>
                                                                            </div>
                                                                        </>
                                                                    ))
                                                                }
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            </div>


                                        </>
                                    ))
                                }
                            </div>
                        </div>


                    </>
                ))
            }
        </div>
    )
}
